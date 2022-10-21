import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import {
  Text,
  View,
  Pressable,
  Button,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
const CameraPage = ({ navigation }) => {
  let cameraRef = useRef();
  const [cameraPermission, setCameraPermission] = useState();
  const [galleryPermission, setGalleryPermission] = useState();
  const [takenPhoto, setTakenPhoto] = useState();

  const handleCameraPermission = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(permission.status === 'granted');
  };

  const handleGalleryPermission = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    setGalleryPermission(permission.status === 'granted');
  };

  useEffect(() => {
    handleCameraPermission();
    handleGalleryPermission();
  }, []);

  if (cameraPermission === undefined) {
    alert('Waiting for approving the permission...');
    return;
  } else if (!cameraPermission) {
    return alert(
      'Permission for camera not granted. Please change this in settings.'
    );
  }

  let handleTakePhotoBtn = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setTakenPhoto(newPhoto);
  };

  if (takenPhoto) {
    let handleSaveBtn = () => {
      MediaLibrary.saveToLibraryAsync(takenPhoto.uri).then(() => {
        setTakenPhoto(undefined);
      });
      alert('Save to gallery successfully!');
    };
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ alignSelf: 'stretch', flex: 1 }}
          source={{ uri: 'data:image/jpg;base64,' + takenPhoto.base64 }}
        />
        {galleryPermission ? (
          <Button title="Save" onPress={handleSaveBtn} />
        ) : undefined}
        <Button title="Discard" onPress={() => setTakenPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      ref={cameraRef}
    >
      <View>
        <Pressable
          style={{
            margin: 10,
            width: 100,
            height: 40,
            backgroundColor: '#F9813A',
            borderRadius: 15,
            textAlign: 'center',
          }}
          onPress={handleTakePhotoBtn}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              paddingTop: 10,
            }}
          >
            Take a Photo
          </Text>
        </Pressable>
      </View>
    </Camera>
  );
};

export default CameraPage;

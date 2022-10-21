import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

const openDatabase = () => {
  const myDB = SQLite.openDatabase('logbookDB.db');
  return myDB;
};
const myDB = openDatabase();

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [linkInput, setLinkInput] = useState('');
  const [imageData, setImageData] = useState([]);

  //create Image table
  const createImageTable = () => {
    myDB.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_images'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS table_images', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS table_images' +
                '(_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'image_URL VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  };

  //Get Image Data
  const getImageData = () => {
    myDB.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_images', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        const response = temp.map((item) => item.image_URL);
        // console.log('response: ', response);
        setImageData(response);
      });
    });
  };

  //Foward Btn
  const forward = () => {
    setCount(count + 1);
  };

  //Backward Btn
  const backward = () => {
    setCount(count - 1);
  };

  //Validate URL
  function checkURL(url) {
    return (
      url.match(
        /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/
      ) != null
    );
  }

  //Handle Add action
  const addLink = () => {
    if (!linkInput) {
      alert('Please enter URL');
      return;
    }
    const response = checkURL(linkInput);
    if (response == true) {
      // alert('Added successfully!');
      // setImages([...images, linkInput]);
      myDB.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO table_images (image_URL) VALUES (?)',
          [linkInput],
          (tx, results) => {
            console.log('Results: ', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'Added Successfully',
                [
                  {
                    text: 'Ok',
                  },
                ],
                { cancelable: false }
              );
            } else {
              Alert.alert('Added failed!');
            }
          }
        );
      });
    } else {
      Alert.alert('Invalid URL');
      return;
    }
  };

  // console.log('result: ', result);

  useEffect(() => {
    createImageTable();
    getImageData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <View
            style={{
              shadowColor: '#696969',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
              elevation: 12,
            }}
          >
            <Image
              source={{
                uri: imageData[count],
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 15,
                borderColor: 'grey',
                borderWidth: 0.2,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 20,
            }}
          >
            <Pressable
              style={{
                margin: 10,
                width: 100,
                height: 40,
                backgroundColor: '#F9813A',
                borderRadius: 15,
                textAlign: 'center',
              }}
              onPress={backward}
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
                Backward
              </Text>
            </Pressable>
            <Pressable
              style={{
                margin: 10,
                width: 100,
                height: 40,
                backgroundColor: '#F9813A',
                borderRadius: 15,
                textAlign: 'center',
              }}
              onPress={forward}
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
                Forward
              </Text>
            </Pressable>
          </View>
          <View>
            <TextInput style={styles.input} onChangeText={setLinkInput} />
            <Pressable
              style={{
                margin: 10,
                width: 200,
                height: 40,
                backgroundColor: '#F9813A',
                borderRadius: 15,
                textAlign: 'center',
              }}
              onPress={addLink}
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
                Add a new URL
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default HomePage;

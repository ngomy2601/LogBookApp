import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';

const HomePage = () => {
  const [count, setCount] = useState(0);

  const images = [
    {
      id: 0,
      URL: 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&dpr=1&s=none',
    },
    {
      id: 1,
      URL: 'https://cdn.britannica.com/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg',
    },
  ];
  const forward = () => {
    setCount(count + 1);
  };

  const backward = () => {
    setCount(count - 1);
  };
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
                uri: images[count].URL,
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

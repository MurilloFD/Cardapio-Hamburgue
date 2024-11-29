import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const MenuScreen = () => {
  const [hamburgers, setHamburgers] = useState([]);

  useEffect(() => {
    const fetchHamburgers = async () => {
      try {
        const response = await axios.get('https://alabama-sanduicheria/api/hamburgers');
        setHamburgers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHamburgers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={hamburgers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R$ {item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: '#D32F2F',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default MenuScreen;

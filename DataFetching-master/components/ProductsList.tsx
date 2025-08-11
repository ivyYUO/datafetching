import React, { useContext } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { DataContext } from "../context/DataContext";
import { Product } from "../types/types";

export default function ProductsList() {
  const { products } = useContext(DataContext);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10 
  },
  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 15, 
    color: '#333',
    textAlign: 'center'
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10
  },
  card: {
    flex: 0.48,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { 
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    color: '#333',
    height: 40
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 2
  },
  rating: {
    fontSize: 12,
    color: '#ff9800'
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5'
  }
});

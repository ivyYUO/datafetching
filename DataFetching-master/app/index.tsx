import ProductsList from "@/components/ProductsList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Product } from "@/types/types";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AppContent: React.FC = () => {
  const { setProducts } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setAllProducts(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setProducts(allProducts);
      return;
    }
    
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleHome = () => {
    setSearchQuery("");
    setProducts(allProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Y  O  R  O  J  A</Text>
      
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => searchProducts(searchQuery)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => searchProducts(searchQuery)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
          <Text style={styles.buttonText}>🏠</Text>
        </TouchableOpacity>
      </View>
      
      <ProductsList />
      
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.customButton} onPress={fetchProducts}>
          <Text style={styles.buttonText}>Reload Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    marginTop: 40 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'System',
  },
  headerContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  homeButton: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

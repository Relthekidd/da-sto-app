import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react-native';
import { useCartStore } from '@/store/cartStore';
import { useNotification } from '@/hooks/useNotification';
import { Product, WeightOption } from '@/types';
import { fetchProductById } from '@/lib/data'

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const addToCart = useCartStore((state) => state.addToCart);
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id as string);
      if (data) {
        setProduct(data);
        if (!selectedWeight) {
          setSelectedWeight(data.weightOptions[0]);
        }
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedWeight) return;

    addToCart(product, selectedWeight, 1);
    showNotification(`Added ${selectedWeight.weight} of ${product.name} to cart`);
    Alert.alert('Added to Cart', `${selectedWeight.weight} of ${product.name}`);
  };

  if (!product) return <Text className="p-4 text-center">Loading product...</Text>;

  return (
    <ScrollView className="p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4 flex-row items-center">
        <ChevronLeft size={20} />
        <Text className="ml-2 text-base text-gray-600">Back</Text>
      </TouchableOpacity>

      {/* Product Image with carousel buttons */}
      <View className="relative mb-4">
        <Image
          source={{ uri: product.image }}
          className="w-full h-64 rounded-xl"
          resizeMode="contain"
        />
        {/* Optional: Carousel navigation logic here */}
      </View>

      {/* Product Info */}
      <Text className="text-2xl font-bold mb-2">{product.name}</Text>
      <Text className="text-gray-700 mb-4">{product.description}</Text>

      {product.effects?.length ? (
        <View className="mb-4">
          <Text className="font-semibold mb-1">Effects</Text>
          <View className="flex-row flex-wrap gap-2">
            {product.effects?.map((effect) => (
              <Text key={effect} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                {effect}
              </Text>
            ))}
          </View>
        </View>
      ) : null}

      {/* Weight Options */}
      <View className="mb-6">
        <Text className="font-semibold mb-2">Choose Weight</Text>
        <View className="flex-row flex-wrap gap-2">
          {product.weightOptions.map((option) => (
            <TouchableOpacity
              key={option.weight}
              onPress={() => setSelectedWeight(option)}
              className={`px-4 py-2 rounded-full border ${
                selectedWeight?.weight === option.weight
                  ? 'bg-green-600 border-green-600'
                  : 'border-gray-400'
              }`}
            >
              <Text className="text-white text-sm">
                {option.weight} - ${option.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Add to Cart */}
      <TouchableOpacity
        onPress={handleAddToCart}
        className="bg-green-600 rounded-md py-3 flex-row justify-center items-center"
      >
        <ShoppingCart size={18} color="white" />
        <Text className="text-white ml-2 font-semibold">
          Add to Cart - ${selectedWeight?.price.toFixed(2) || '0.00'}
        </Text>
      </TouchableOpacity>

      {notification && (
        <View className="mt-4 bg-green-100 rounded p-3">
          <Text className="text-green-700 text-sm">{notification}</Text>
        </View>
      )}
    </ScrollView>
  );
}

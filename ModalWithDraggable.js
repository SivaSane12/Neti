import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, PanResponder } from 'react-native';

const ModalWithDraggable = ({ showCategories, setShowCategories, categories, selectedCategories, handleCategoryToggle }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      setOffset({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: () => {
      setOffset({ x: 0, y: 0 });
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCategories}
      onRequestClose={() => setShowCategories(false)}
    >
      <View style={styles.modalContainer}>
        <ScrollView
          contentContainerStyle={[styles.modalContent, { transform: [{ translateX: offset.x }, { translateY: offset.y }] }]}
          {...panResponder.panHandlers}
        >
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowCategories(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          {/* Render categories */}
          {categories.map(category => (
            <TouchableOpacity
              key={category.Id}
              style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
              onPress={() => handleCategoryToggle(category.Id)}
            >
              <Text style={styles.categoryText}>{category.Category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  selectedCategoryItem: {
    backgroundColor: 'rgba(22, 223, 255, 0.3)',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ModalWithDraggable;

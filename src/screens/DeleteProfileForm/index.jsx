import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { colors, fontType } from '../../theme';

const DeleteProfileForm = ({ navigation, route }) => {
  const { id } = route.params; // Dapatkan ID dari route

  const handleDelete = async () => {
    try {
      await axios.delete(`https://6823403e65ba05803395f61e.mockapi.io/api/blog/${id}`);
      Alert.alert('Berhasil', 'Profil berhasil dihapus.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Gagal menghapus profil.');
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Hapus Profil',
      'Apakah Anda yakin ingin menghapus profil ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', onPress: handleDelete, style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hapus Profil</Text>
      <Text style={styles.warning}>Tindakan ini tidak dapat dibatalkan.</Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={confirmDelete}>
        <Text style={styles.deleteText}>Hapus Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Batal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 10,
  },
  warning: {
    fontSize: 16,
    color: colors.red(),
    fontFamily: fontType['Pjs-Regular'],
    textAlign: 'center',
    marginBottom: 30,
  },
  deleteBtn: {
    backgroundColor: colors.red(),
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  deleteText: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
  },
  cancelBtn: {
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
  },
});

export default DeleteProfileForm;

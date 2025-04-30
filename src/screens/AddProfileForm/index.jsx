import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { colors, fontType } from '../../theme';
import { ProfileData } from '../../data';  // Memuat data profil awal
import { Edit, Camera, Gallery } from 'iconsax-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';  // Import image picker

const AddProfileForm = ({ navigation }) => {
  const [name, setName] = useState(ProfileData.name);
  const [joinDate, setJoinDate] = useState(ProfileData.joinDate);
  const [level, setLevel] = useState(ProfileData.level);
  const [totalSessions, setTotalSessions] = useState(ProfileData.totalSessions.toString());
  const [activeStreak, setActiveStreak] = useState(ProfileData.activeStreak.toString());
  const [caloriesBurned, setCaloriesBurned] = useState(ProfileData.caloriesBurned.toString());
  const [goals, setGoals] = useState(ProfileData.goals.join(', '));  // Goals diubah menjadi string
  const [badges, setBadges] = useState(ProfileData.badges.join(', '));  // Badges diubah menjadi string
  const [profilePict, setProfilePict] = useState(ProfileData.profilePict);  // Untuk menyimpan foto profil
  const [email, setEmail] = useState(ProfileData.email);  // Alamat email

  // Fungsi untuk memilih gambar dari galeri
  const selectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setProfilePict(response.assets[0].uri);  // Update URL gambar
        }
      }
    );
  };

  // Fungsi untuk mengambil gambar dengan kamera
  const takePhoto = () => {
    launchCamera(
      { mediaType: 'photo', quality: 0.5 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setProfilePict(response.assets[0].uri);  // Update URL gambar
        }
      }
    );
  };

  const handleSave = () => {
    // Menyimpan data profil yang telah diubah
    const updatedProfile = {
      profilePict,  // Gambar profil yang sudah diubah
      name,
      email,  // Menambahkan email
      joinDate,
      level,
      totalSessions: parseInt(totalSessions),
      activeStreak: parseInt(activeStreak),
      caloriesBurned: parseInt(caloriesBurned),
      goals: goals.split(',').map(goal => goal.trim()),  // Mengubah kembali ke array
      badges: badges.split(',').map(badge => badge.trim()),  // Mengubah kembali ke array
    };

    // Tampilkan alert atau simpan ke penyimpanan lokal/API
    Alert.alert('Profile Updated', 'Profil kamu berhasil diperbarui!');
    navigation.goBack();  // Kembali ke halaman sebelumnya setelah menyimpan
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <TouchableOpacity style={styles.profilePicContainer} onPress={selectImage}>
        <Image source={{ uri: profilePict }} style={styles.profilePic} />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nama Lengkap:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nama Lengkap"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Tanggal Bergabung:</Text>
      <TextInput
        style={styles.input}
        value={joinDate}
        onChangeText={setJoinDate}
        placeholder="Tanggal Bergabung"
      />

      <Text style={styles.label}>Level (Beginner/Intermediate/Advanced):</Text>
      <TextInput
        style={styles.input}
        value={level}
        onChangeText={setLevel}
        placeholder="Level"
      />

      <Text style={styles.label}>Total Sesi:</Text>
      <TextInput
        style={styles.input}
        value={totalSessions}
        onChangeText={setTotalSessions}
        placeholder="Total Sesi"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Active Streak:</Text>
      <TextInput
        style={styles.input}
        value={activeStreak}
        onChangeText={setActiveStreak}
        placeholder="Active Streak"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Kalori Terbakar:</Text>
      <TextInput
        style={styles.input}
        value={caloriesBurned}
        onChangeText={setCaloriesBurned}
        placeholder="Kalori Terbakar"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Goals (pisahkan dengan koma):</Text>
      <TextInput
        style={styles.input}
        value={goals}
        onChangeText={setGoals}
        placeholder="Goals"
      />

      <Text style={styles.label}>Badges (pisahkan dengan koma):</Text>
      <TextInput
        style={styles.input}
        value={badges}
        onChangeText={setBadges}
        placeholder="Badges"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    fontSize: 14,
    color: colors.green(),
    fontFamily: fontType['Pjs-Medium'],
  },
  label: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey(0.6),
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
  saveBtn: {
    backgroundColor: colors.green(),
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
  },
});

export default AddProfileForm;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { colors, fontType } from '../../theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getFirestore, onSnapshot, updateDoc, doc } from '@react-native-firebase/firestore';


const EditProfileForm = ({ navigation, route }) => {
  const { profileData } = route.params;

  const [name, setName] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [level, setLevel] = useState('');
  const [totalSessions, setTotalSessions] = useState('');
  const [activeStreak, setActiveStreak] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [goals, setGoals] = useState('');
  const [badges, setBadges] = useState('');
  const [profilePict, setProfilePict] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profileData) {
      setName(profileData.name || '');
      setEmail(profileData.email || '');
      setJoinDate(profileData.joinDate || '');
      setLevel(profileData.level || '');
      setTotalSessions(profileData.totalSessions?.toString() || '');
      setActiveStreak(profileData.activeStreak?.toString() || '');
      setCaloriesBurned(profileData.caloriesBurned?.toString() || '');
      setGoals(profileData.goals || '');
      setBadges(profileData.badges || '');
      setProfilePict(profileData.profilePict ? { uri: profileData.profilePict } : null);
    }
  }, [profileData]);

  const selectImage = () => {
  launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
    if (response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      setProfilePict(selectedImage.uri);
    }
  });
};


  const handleUpdate = async () => {
  if (!profileData?.id) {
    Alert.alert('Error', 'Data profil tidak ditemukan.');
    return;
  }

  const updatedProfile = {
    profilePict: profilePict || '',
    name,
    email,
    joinDate,
    level,
    totalSessions: parseInt(totalSessions) || 0,
    activeStreak: parseInt(activeStreak) || 0,
    caloriesBurned: parseInt(caloriesBurned) || 0,
    goals: goals.split(',').map(goal => goal.trim()),
    badges: badges.split(',').map(badge => badge.trim()),
  };

  try {
    const db = getFirestore();
    const docRef = doc(db, 'profiles', profileData.id);
    await updateDoc(docRef, updatedProfile);
    Alert.alert('Sukses', 'Profil berhasil diperbarui di Firestore!');
    navigation.goBack();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Gagal memperbarui profil.');
  }
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profil</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
  {profilePict ? (
    <Image source={{ uri: profilePict }} style={styles.image} />
  ) : (
    <Text style={styles.imagePlaceholder}>Pilih Foto Profil</Text>
  )}
</TouchableOpacity>


      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama Lengkap" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} value={joinDate} onChangeText={setJoinDate} placeholder="Tanggal Bergabung" />
      <TextInput style={styles.input} value={level} onChangeText={setLevel} placeholder="Level" />
      <TextInput style={styles.input} value={totalSessions} onChangeText={setTotalSessions} placeholder="Total Sesi" keyboardType="numeric" />
      <TextInput style={styles.input} value={activeStreak} onChangeText={setActiveStreak} placeholder="Active Streak" keyboardType="numeric" />
      <TextInput style={styles.input} value={caloriesBurned} onChangeText={setCaloriesBurned} placeholder="Kalori Terbakar" keyboardType="numeric" />
      <TextInput style={styles.input} value={goals} onChangeText={setGoals} placeholder="Goals (pisahkan dengan koma)" />
      <TextInput style={styles.input} value={badges} onChangeText={setBadges} placeholder="Badges (pisahkan dengan koma)" />

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={styles.saveText}>Perbarui</Text>
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
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100, height: 100, borderRadius: 50,
  },
  imagePlaceholder: {
    fontSize: 14,
    color: colors.grey(0.6),
    fontFamily: fontType['Pjs-Regular'],
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
    marginTop: 10,
  },
  saveText: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
  },
});

export default EditProfileForm;

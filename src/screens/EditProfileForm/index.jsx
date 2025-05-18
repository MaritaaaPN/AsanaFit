import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { colors, fontType } from '../../theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

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
      if (response.assets) {
        setProfilePict(response.assets[0]);
      }
    });
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    if (profilePict && profilePict.uri) {
      formData.append('profilePict', {
        uri: profilePict.uri,
        type: profilePict.type || 'image/jpeg',
        name: profilePict.fileName || 'profile.jpg',
      });
    }

    formData.append('name', name);
    formData.append('email', email);
    formData.append('joinDate', joinDate);
    formData.append('level', level);
    formData.append('totalSessions', totalSessions);
    formData.append('activeStreak', activeStreak);
    formData.append('caloriesBurned', caloriesBurned);
    formData.append('goals', goals);
    formData.append('badges', badges);

    try {
      await axios.put(`https://6823403e65ba05803395f61e.mockapi.io/api/blog/${profileData.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Sukses', 'Profil berhasil diperbarui!');
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
          <Image source={{ uri: profilePict.uri }} style={styles.image} />
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

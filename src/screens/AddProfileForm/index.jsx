import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity,Alert, Image, ScrollView, ActivityIndicator} from 'react-native';
import { colors, fontType } from '../../theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { addDoc, updateDoc, collection, getFirestore, doc } from '@react-native-firebase/firestore';

const AddProfileForm = ({ navigation, route }) => {
  const profile = route.params?.profile || null;

  const [name, setName] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [level, setLevel] = useState('');
  const [totalSessions, setTotalSessions] = useState('');
  const [activeStreak, setActiveStreak] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [goals, setGoals] = useState('');
  const [badges, setBadges] = useState('');
  const [profilePict, setProfilePict] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Prefill form saat edit
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setJoinDate(profile.joinDate || '');
      setLevel(profile.level || '');
      setTotalSessions(profile.totalSessions?.toString() || '');
      setActiveStreak(profile.activeStreak?.toString() || '');
      setCaloriesBurned(profile.caloriesBurned?.toString() || '');
      setGoals(profile.goals?.join(', ') || '');
      setBadges(profile.badges?.join(', ') || '');
      setProfilePict(profile.profilePict || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const selectImage = () => {
  launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
    if (!response.didCancel && !response.errorCode && response.assets && response.assets.length > 0) {
      const uri = response.assets[0].uri;
      setProfilePict(uri);
    }
  });
};

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, response => {
      if (!response.didCancel && !response.errorCode) {
        setProfilePict(response.assets[0].uri);
      }
    });
  };

  const handleSave = async () => {
  if (!name || !email) {
    Alert.alert('Error', 'Nama dan email wajib diisi.');
    return;
  }

  const newProfile = {
    profilePict,
    name,
    email,
    joinDate,
    level,
    totalSessions: parseInt(totalSessions) || 0,
    activeStreak: parseInt(activeStreak) || 0,
    caloriesBurned: parseInt(caloriesBurned) || 0,
    goals: goals.split(',').map(item => item.trim()),
    badges: badges.split(',').map(item => item.trim())
  };

  try {
    setLoading(true);
    const db = getFirestore();

    if (profile && profile.id) {
      // 🔁 Edit mode: update document by ID
      const profileRef = doc(db, 'profiles', profile.id);
      await updateDoc(profileRef, newProfile);
      Alert.alert('Berhasil', 'Profil berhasil diperbarui!');
    } else {
      // ➕ Tambah mode: tambah data baru
      await addDoc(collection(db, 'profiles'), newProfile);
      Alert.alert('Berhasil', 'Profil berhasil ditambahkan!');
    }

    setLoading(false);
    navigation.goBack();
  } catch (error) {
    setLoading(false);
    Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan.');
    console.error(error);
  }
};



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {profile ? 'Edit Profil' : 'Tambah Profil'}
        </Text>
      </View>

      <TouchableOpacity style={styles.profilePicContainer} onPress={selectImage}>
        {profilePict ? (
          <Image source={{ uri: profilePict }} style={styles.profilePic} />
        ) : (
          <View style={[styles.profilePic, {
            backgroundColor: colors.grey(0.2),
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            <Text style={{ color: colors.grey(), fontSize: 12 }}>Pilih Foto</Text>
          </View>
        )}
        <Text style={styles.changePhotoText}>Ubah Foto</Text>
      </TouchableOpacity>

      {/* INPUT FIELD */}
      <Text style={styles.label}>Nama Lengkap</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

      <Text style={styles.label}>Tanggal Bergabung</Text>
      <TextInput style={styles.input} value={joinDate} onChangeText={setJoinDate} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Level</Text>
      <TextInput style={styles.input} value={level} onChangeText={setLevel} placeholder="Beginner / Intermediate / Advanced" />

      <Text style={styles.label}>Total Sesi</Text>
      <TextInput style={styles.input} value={totalSessions} onChangeText={setTotalSessions} keyboardType="numeric" />

      <Text style={styles.label}>Active Streak</Text>
      <TextInput style={styles.input} value={activeStreak} onChangeText={setActiveStreak} keyboardType="numeric" />

      <Text style={styles.label}>Kalori Terbakar</Text>
      <TextInput style={styles.input} value={caloriesBurned} onChangeText={setCaloriesBurned} keyboardType="numeric" />

      <Text style={styles.label}>Goals (pisahkan dengan koma)</Text>
      <TextInput style={styles.input} value={goals} onChangeText={setGoals} placeholder="Contoh: Fitness, Diet" />

      <Text style={styles.label}>Badges (pisahkan dengan koma)</Text>
      <TextInput style={styles.input} value={badges} onChangeText={setBadges} placeholder="Contoh: Top Learner, 30 Days" />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.white()} />
        ) : (
          <Text style={styles.saveText}>{profile ? 'Perbarui' : 'Simpan'}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.white(), padding: 20,
  },
  header: {
    marginBottom: 20, alignItems: 'center',
  },
  title: {
    fontSize: 24, fontFamily: fontType['Pjs-Bold'], color: colors.black(),
  },
  profilePicContainer: {
    alignItems: 'center', marginBottom: 20,
  },
  profilePic: {
    width: 100, height: 100, borderRadius: 50, marginBottom: 10,
  },
  changePhotoText: {
    fontSize: 14, color: colors.green(), fontFamily: fontType['Pjs-Medium'],
  },
  label: {
    fontSize: 14, fontFamily: fontType['Pjs-Regular'], color: colors.black(), marginBottom: 5,
  },
  input: {
    borderWidth: 1, borderColor: colors.grey(0.6), borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 16, marginBottom: 15, fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
  saveBtn: {
    backgroundColor: colors.green(), paddingVertical: 12,
    alignItems: 'center', borderRadius: 8, marginTop: 20,
  },
  saveText: {
    color: colors.white(), fontSize: 16, fontFamily: fontType['Pjs-Bold'],
  },
});

export default AddProfileForm;

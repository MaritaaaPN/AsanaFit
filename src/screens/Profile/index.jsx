import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,Alert,ActivityIndicator,Share} from 'react-native';
import { colors, fontType } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, onSnapshot, doc, deleteDoc } from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      const unsubscribeSnapshot = onSnapshot(
        collection(db, 'profiles'),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProfile(data.length > 0 ? data[0] : null);
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching profile:', err);
          setError(err.message);
          setProfile(null);
          setLoading(false);
        }
      );

      return () => unsubscribeSnapshot(); // Stop listening on unmount
    });

    return unsubscribe;
  }, [navigation]);

  const handleEdit = () => {
    navigation.navigate('AddProfileForm', { profile });
  };

  const handleDelete = async () => {
    if (!profile?.id) {
      Alert.alert('Error', 'Tidak dapat menemukan ID profil');
      return;
    }

    Alert.alert(
      'Konfirmasi',
      'Apakah kamu yakin ingin menghapus profil?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'profiles', profile.id));
              setProfile(null);
              Alert.alert('Berhasil', 'Profil telah dihapus.');
            } catch (error) {
              Alert.alert('Gagal Menghapus Profil', error.message);
            }
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Yuk lihat profil aku di AsanaFit!\n\nNama: ${profile?.name}\nEmail: ${profile?.email}\nLevel: ${profile?.level}\nBergabung sejak: ${profile?.joinDate}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Kamu berhasil keluar dari akun AsanaFit.');
  };

  // RENDERING
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.green()} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Gagal memuat profil: {error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => { setError(null); setLoading(true); }}>
          <Text style={styles.btnText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>MY PROFILE</Text>
        <Image
          source={require('../../assets/images/profile.jpg')}
          style={{ width: 300, height: 350, alignSelf: 'center', marginBottom: 10 }}
        />
        <Text style={{ textAlign: 'center', marginBottom: 20, color: colors.grey(0.7) }}>
          Kamu belum menambahkan profilmu. Yuk mulai sekarang!
        </Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleEdit}>
          <Text style={styles.btnText}>TAMBAH PROFIL</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.motivationBox}>
        <Text style={styles.motivationText}>Tetap Semangat, {profile?.name?.split(' ')[0] || 'Pejuang Sehat'}!</Text>
        <Text style={styles.motivationSubText}>Konsistensi adalah kunci untuk mencapai tujuanmu!</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={profile.profilePict ? { uri: profile.profilePict } : require('../../assets/images/profile.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.level}>{profile.level}</Text>
        <Text style={styles.joinDate}>Bergabung sejak {profile.joinDate}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.btnText}>Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.btnText}>Hapus Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile.totalSessions}</Text>
          <Text style={styles.statLabel}>Sesi</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile.activeStreak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile.caloriesBurned}</Text>
          <Text style={styles.statLabel}>Kalori</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goals</Text>
        {Array.isArray(profile.goals) && profile.goals.length > 0 ? (
          profile.goals.map((goal, index) => (
            <Text key={index} style={styles.sectionContent}>• {goal}</Text>
          ))
        ) : (
          <Text style={styles.sectionContent}>Belum ada goals</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        {Array.isArray(profile.badges) && profile.badges.length > 0 ? (
          profile.badges.map((badge, index) => (
            <Text key={index} style={styles.sectionContent}>🏅 {badge}</Text>
          ))
        ) : (
          <Text style={styles.sectionContent}>Belum ada badges</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: colors.red(),
    fontFamily: fontType['Pjs-Medium'],
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: colors.green(),
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },
  retryBtn: {
    backgroundColor: colors.blue(),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 4,
    alignSelf: 'center',
  },
  btnText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    backgroundColor: colors.grey(0.2),
  },
  name: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
  },
  level: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.8),
    marginTop: 4,
    textAlign: 'center',
  },
  joinDate: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
    marginTop: 2,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 10,
    flexWrap: 'wrap',
  },
  editBtn: {
    backgroundColor: colors.grey(0.9),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 4,
  },
  shareBtn: {
    backgroundColor: colors.green(),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 4,
  },
  deleteBtn: {
    backgroundColor: colors.red(0.8),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 4,
  },
  statSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 6,
    textAlign: 'center',
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
    marginBottom: 2,
    textAlign: 'center',
  },
  logoutBtn: {
    backgroundColor: colors.red(0.9),
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  logoutText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
  },
  motivationBox: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.grey(0.1),
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
  },
  motivationSubText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ProfileScreen;

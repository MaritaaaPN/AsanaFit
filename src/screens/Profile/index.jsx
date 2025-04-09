import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,Alert,} from 'react-native';
import { colors, fontType } from '../../theme';
import { Share } from 'react-native';
import {ProfileData} from '../../data';

const ProfileScreen = () => {
  const handleEdit = () => {
    Alert.alert('Edit Profile', 'Fitur ubah profil akan segera hadir!');
  };

  const handleShare = () => {
    Share.share({
      message: `Lihat profil aku di AsanaFit! Nama: ${ProfileData.name}`,
    });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Kamu berhasil keluar dari akun AsanaFit.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={{ uri: ProfileData.profilePict }} style={styles.avatar} />
        <Text style={styles.name}>{ProfileData.name}</Text>
        <Text style={styles.level}>{ProfileData.level}</Text>
        <Text style={styles.joinDate}>Bergabung sejak {ProfileData.joinDate}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.btnText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ProfileData.totalSessions}</Text>
          <Text style={styles.statLabel}>Sesi</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ProfileData.activeStreak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{ProfileData.caloriesBurned}</Text>
          <Text style={styles.statLabel}>Kalori</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goals</Text>
        {ProfileData.goals.map((goal, index) => (
          <Text key={index} style={styles.sectionContent}>• {goal}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        {ProfileData.badges.map((badge, index) => (
          <Text key={index} style={styles.sectionContent}>🏅 {badge}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white(),
      paddingHorizontal: 20,
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
    },
    editBtn: {
      backgroundColor: colors.grey(0.9),
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },  
    shareBtn: {
      backgroundColor: colors.green(),
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    btnText: {
      color: colors.white(),
      fontFamily: fontType['Pjs-Medium'],
      fontSize: 14,
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
  });
  

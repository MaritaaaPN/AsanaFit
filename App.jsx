import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, FlatList, Pressable } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

const BeginnerProgram = () => {
  const handlePress = (title) => {
    console.log(`Card "${title}" pressed`);
};

const sessions = [
  { id: '1', title: 'Dasar - Dasar Yoga', duration: '10 MENIT', image: 'https://yogajala.com/wp-content/uploads/13-Vinyasa-Yoga-Poses-3.jpg' },
  { id: '2', title: 'Alur Yoga', duration: '10 MIN', image: 'https://solusiibuattack.com/uploads/post/sedang-penat-lakukan-5-gerakan-yoga-ini-yuk-smart-mom220630071518.jpg' },
  { id: '3', title: 'Jenis Yoga', duration: '11 MIN', image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1597814122/attached_image/sering-nyeri-punggung-coba-pose-yoga-ini.jpg' },
];

const cardData = [
  {
    category: 'RUTINITAS HARIAN',
    title: 'Berat Badan',
    description: 'Pemeriksaan rutin akan membantu Anda mencapai tujuan',
    image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1642754562/attached_image/empat-fakta-tentang-timbangan-badan-yang-belum-anda-ketahui.jpg',
  },
  {
    category: 'MEDITASI',
    title: 'Kesadaran Diri',
    description: 'Mulai hari Anda dengan pikiran yang jernih dan fokus',
    image: 'https://cdn.rri.co.id/berita/Palu/o/1719063861289-Orange_Gradient_Sunset_Desktop_Wallpaper_(39)/dj87j0idx8htu5z.jpeg',
  },
  {
    category: 'OLAHRAGA',
    title: 'Yoga Pagi',
    description: 'Regangkan dan segarkan tubuh Anda untuk hari ini',
    image: 'https://cnc-magazine.oramiland.com/parenting/images/stretching.width-800.format-webp_XJuSlOS.webp',
  },
];

const recommendations = [
  { id: '1', title: 'Peningkat Energi', duration: '23 MIN', description: 'Bakar lemak dengan cepat dengan latihan yoga yang terinspirasi dari kardio. Bangun otot ramping dan bakar kalori ekstra.', image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/physicalactivitylp_804x482.jpg?as=0&w=967&rev=49578a5889d64349a3cc68b2ac762e43&hash=7E56938D92292108240175617FC67FE4' },
  { id: '2', title: 'Tidur Nyenyak', duration: '24 MIN', description: 'Bersiaplah untuk tidur malam yang nyenyak dengan serangkaian pose lembut ini. Tubuh dan pikiran Anda akan berterima kasih.', image: 'https://cdn.timesmedia.co.id/images/2019/08/17/Tidur-Nyenyak.jpg' },
  { id: '3', title: 'Inti Tubuh Kuat', duration: '24 MIN', description: 'Latihan yoga keseimbangan dinamis yang memperkuat inti tubuh Anda dan meningkatkan postur.', image: 'https://cdn0-production-images-kly.akamaized.net/doM92RkEja8hJJg_u4RBKbEWPrU=/0x106:1999x1233/469x260/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3358314/original/072625900_1611545992-shutterstock_1822312757.jpg' },
];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ASANA FIT</Text>
      <Text style={styles.subtitle}>
        Hai User! Mulai aktivitas Anda dengan Program Pemula untuk mempelajari dasar penting Yoga & Fitness.
      </Text>
      <View style={styles.progressBar} />

      <View style={searchBar.container}>
        <TextInput
          style={searchBar.input}
          placeholder="Search"
        />
        <Pressable style={searchBar.button}>
          <SearchNormal size={15} color={colors.white()} />
        </Pressable>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.sessionItem}>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>{index + 1}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.duration}>{item.duration}</Text>
              <Text style={styles.sessionTitle}>{item.title}</Text>
            </View>
          </View>
        )}
      />

      {/* ScrollView Horizontal untuk Card */}
      <Text style={styles.sectionTitle}>Daily Activities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {cardData.map((item, index) => (
          <Pressable key={index} style={styles.card} onPress={() => handlePress(item.title)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recommended</Text>
      {recommendations.map((item) => (
        <View key={item.id} style={stylesTopPicks.card}>
          <Image source={{ uri: item.image }} style={stylesTopPicks.image} />
          <View style={stylesTopPicks.textContainer}>
            <Text style={stylesTopPicks.duration}>{item.duration}</Text>
            <Text style={stylesTopPicks.cardTitle}>{item.title}</Text>
            <Text style={stylesTopPicks.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const searchBar = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: colors.grey(0.03),
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    height: 40,
    padding: 10,
    width: '88%',
  },
  button: {
    backgroundColor: colors.green(),
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
  },
  progressBar: {
    display: 'none',
    // height: 5,
    // backgroundColor: '#ccc',
    // borderRadius: 5,
    // marginVertical: 15,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 30, // 30 agar benar-benar bulat
    backgroundColor: '#fff', 
    borderWidth: 1, // Ketebalan garis tepi
    //borderColor: 'green', // Warna garis tepi hijau
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  duration: {
    color: 'green',
    fontSize: 12,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'green',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 250,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    marginRight: 16,
    padding: 12,
    elevation: 4, // Efek bayangan
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
});

const stylesTopPicks = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 170,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  duration: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
});

export default BeginnerProgram;

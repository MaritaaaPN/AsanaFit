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

  const activitiesData = [
    {
      id: '1',
      title: 'Exercise',
      image: 'https://rimma.co/wp-content/uploads/-000//1/exercise-outside-woman-stock-today-150427-tease_72497df9c4ab67a1d1a016b22206a5af.jpg',
      description: 'Latihan fisik harian untuk menjaga tubuh tetap aktif dan sehat.',
      category: 'Fitness',
    },
    {
      id: '2',
      title: 'Challenges',
      image: 'https://xplorgym.co.uk/wp-content/uploads/2023/11/gym-challenges.jpg',
      description: 'Tantangan mingguan untuk memotivasi dan melatih konsistensi.',
      category: 'Motivasi',
    },
    {
      id: '3',
      title: 'Sleep',
      image: 'https://cdn.timesmedia.co.id/images/2019/08/17/Tidur-Nyenyak.jpg',
      description: 'Tips tidur berkualitas demi pemulihan tubuh dan pikiran.',
      category: 'Kesehatan',
    },
    {
      id: '4',
      title: 'Nutrition',
      image: 'https://cdn.antaranews.com/cache/1200x800/2020/09/01/01195544-C462-46F9-B684-3C36AE6ED671.jpeg',
      description: 'Panduan nutrisi seimbang untuk energi dan daya tahan tubuh.',
      category: 'Gizi',
    },
    {
      id: '5',
      title: 'Mindfulness',
      image: 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/11/10024320/Jaga-Kesehatan-Mental-dengan-Menerapkan-Mindfulness.jpg.webp',
      description: 'Latihan kesadaran diri untuk mengelola stres dan emosi.',
      category: 'Mental',
    },
  ];  

  const statsData = {
    totalSessions: 124,
    caloriesBurned: 32890,
    streak: 15,
  };
  
  const scheduleData = [
    { id: '1', time: '07:00 AM', activity: 'Morning Yoga', duration: '15 min' },
    { id: '2', time: '12:00 PM', activity: 'Stretching', duration: '10 min' },
    { id: '3', time: '08:30 PM', activity: 'Meditation', duration: '20 min' },
  ];
  
  const todoData = [
    { id: '1', task: 'Complete Yoga Session', done: false },
    { id: '2', task: 'Log Today\'s Weight', done: true },
    { id: '3', task: '10-minute Meditation', done: false },
  ];

  const ProfileData = {
    profilePict: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfE0BIdm0d8Htavsb0uVX5OMluG2luWfH_iA&s',
    name: 'Marita Putri Nabila',
    email: 'Marita.nabila@email.com',
    joinDate: '18 Mar, 2020',
    level: 'Intermediate',
    totalSessions: 124,
    activeStreak: 15,
    caloriesBurned: 32890,
    goals: ['Meningkatkan kelenturan tubuh','Meditasi harian untuk fokus','Meningkatkan kekuatan otot','Latihan kardio secara rutin',],
    badges: ['Streak 7 Hari Berturut-turut','Konsistensi Pro','Cardio Champion','Yoga Warrior',],
  };

export { sessions, cardData, recommendations, activitiesData, statsData, scheduleData, todoData, ProfileData};
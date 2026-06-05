import { Album } from './types';

export const HERO_TEXT = {
  en: "Where sound finds its home.",
  vn: "Nơi âm thanh tìm thấy ngôi nhà của chính mình."
};

export const ARTIST_INFO = {
  name: "D.LAUGHING",
  avatarUrl: "/src/assets/images/d_laughing_portrait_1780621477686.png",
  bio: {
    en: "D.Laughing is an architect of sonic landscapes. A creator who turns emotions into avant-garde compositions.",
    vn: "D.Laughing là kiến trúc sư của những không gian âm thanh. Người biến cảm xúc thành những tác phẩm nghệ thuật đương đại."
  }
};

export const ALBUMS: Album[] = [
  {
    id: "sonic-landscapes",
    title: "Sonic Landscapes",
    year: "2024",
    coverUrl: "/src/assets/images/album_sonic_landscapes_1780621489659.png",
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    youtubeUrl: "https://youtube.com",
    descriptionEn: "A structural exploration of acoustic space and architectural line grids transformed into soundscapes.",
    descriptionVn: "Khám phá cấu trúc của không gian âm học và lưới đường vẽ kiến trúc được biến dịch thành âm cảnh."
  },
  {
    id: "avant-garde-emotions",
    title: "Avant-Garde Emotions",
    year: "2025",
    coverUrl: "/src/assets/images/album_avant_garde_emotions_1780621502065.png",
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    youtubeUrl: "https://youtube.com",
    descriptionEn: "Raw expressiveness captured through textured sound design, exploring delicate human micro-states.",
    descriptionVn: "Cảm xúc thô mộc được ghi lại qua thiết kế âm thanh giàu kết cấu, khai phá những vi trạng thái tinh tế của con người."
  },
  {
    id: "silent-echo",
    title: "The Silent Echo",
    year: "2026",
    coverUrl: "/src/assets/images/album_silent_echo_1780621521072.png",
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
    youtubeUrl: "https://youtube.com",
    descriptionEn: "A delicate atmospheric album revolving around glowing voids, dynamic quietness, and soft echoes.",
    descriptionVn: "Một album khí quyển thanh tao xoay quanh khoảng trống tỏa sáng, sự yên tĩnh dịch động và tiếng vang mềm mại."
  }
];

export const ABOUT_TEXT = {
  visionTitle: {
    en: "THE VISION",
    vn: "TẦM NHÌN"
  },
  visionBody: {
    en: "ae Label is an ecosystem for visionary artists. We bridge the gap between creative freedom and global distribution, ensuring that every note finds its rightful audience.",
    vn: "ae Label là hệ sinh thái dành cho những nghệ sĩ tiên phong. Chúng tôi xóa bỏ khoảng cách giữa sự tự do sáng tạo và thị trường âm nhạc quốc tế, đảm bảo mỗi giai điệu đều tìm thấy đích đến của riêng mình."
  },
  foundationTitle: {
    en: "FOUNDATION",
    vn: "NỀN TẢNG"
  },
  foundationBody: {
    en: "Established on October 2, 2025, ae Label operates as a specialized division under AUDOR Co., Ltd. We are dedicated to providing high-level management, strategic distribution, and comprehensive brand development for contemporary artists.",
    vn: "Được thành lập vào ngày 02/10/2025, ae Label là đơn vị trực thuộc AUDOR Co., Ltd. Chúng tôi tập trung vào việc cung cấp dịch vụ quản lý chuyên sâu, chiến lược phát hành và định hướng hình ảnh toàn diện cho các nghệ sĩ đương đại."
  },
  servicesTitle: {
    en: "OUR SERVICES",
    vn: "DỊCH VỤ CỦA CHÚNG TÔI"
  },
  services: [
    {
      en: "Artist Management",
      vn: "Quản lý nghệ sĩ"
    },
    {
      en: "Global Distribution",
      vn: "Phát hành nhạc toàn cầu"
    },
    {
      en: "Creative Direction",
      vn: "Định hướng sáng tạo & hình ảnh"
    }
  ]
};

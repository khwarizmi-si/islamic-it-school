// Content for the per-book landing pages (/itmi, /lc, ...). HTML fields are trusted, author-written markup.
export type Book = (typeof books)[number];

export const books = [
	{
		slug: "itmi",
		title: "Islamic Technology Mindset Installation (ITMI)",
		short: "ITMI",
		name: "Islamic Technology Mindset Installation (ITMI)",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/ITMI",
		price: 181000,
		normalPrice: 200000,
		lynk: "https://gsiofficial.xyz/gsiofficial/aYgaVW1",
		shopee: "https://shopee.co.id/Islamic-Technology-Mindset-Installation-(ITMI)-i.1344216734.42701668117",
		hero: {
			question: "GAGAL MENGENDALIKAN TEKNOLOGI?",
			answer: "ITMI Solusinya!",
			introHtml: "<p><span class=\"font-semibold\">Islamic Technology Mindset Installation</span> adalah metode revolusioner yang memiliki dua fungsi utama:</p><ul><li>Sebagai metode preventif &amp; kuratif untuk mudhorot teknologi</li><li>Sebagai metode belajar IT yang efektif dan lebih cepat</li></ul>",
			warning: "PERINGATAN: Buku ini akan mengubah cara Anda memandang teknologi!",
			cta: "BUKTIKAN SEKARANG!",
			mockup: "/img/ITMI/mockup-itmi.png"
		},
		problems: {
			title: "MASALAH TEKNOLOGI YANG MENGANCAM GENERASI",
			subtitle: "Teknologi bisa menjadi berkah atau bencana tergantung bagaimana kita menggunakannya",
			items: [
				{
					title: "Kecanduan Teknologi",
					text: "Nomophobia (takut tanpa ponsel), game addiction, dan kecanduan media sosial merusak mental dan produktivitas generasi muda."
				},
				{
					title: "Degradasi Moral",
					text: "Konten negatif di internet merusak akhlak dan nilai-nilai Islami yang seharusnya dijunjung tinggi."
				},
				{
					title: "Pembelajaran IT Tidak Efektif",
					text: "Metode pembelajaran IT konvensional terlalu lambat dan tidak menyentuh aspek mindset Islami dalam penggunaan teknologi."
				}
			],
			alert: "APAKAH ANDA INGIN GENERASI ANDA TENGELAM DALAM MASALAH INI?"
		},
		solution: {
			title: "PARADIGMA MUSLIM DIGITAL",
			subtitle: "Panduan komprehensif berteknologi sesuai syariat di era disrupsi",
			items: [
				{
					title: "Teknologi dalam Bingkai Syariat",
					html: "ITMI mengajarkan prinsip dasar bagaimana seorang muslim seharusnya berinteraksi dengan teknologi - tidak menjadi budak gadget tetapi menjadi khalifah yang memanfaatkannya untuk kemaslahatan umat."
				},
				{
					title: "Kurikulum IT Era Disrupsi",
					html: "Metode pembelajaran IT yang revolusioner: fokus pada <span class=\"font-semibold\">problem-solving</span>, <span class=\"font-semibold\">project-based learning</span>, dan <span class=\"font-semibold\">nilai Islami</span> untuk mencetak generasi yang siap menghadapi tantangan digital."
				},
				{
					title: "Keseimbangan Digital-Spiritual",
					html: "Formula khusus untuk menciptakan generasi yang <span class=\"font-semibold\">menguasai teknologi</span> namun tetap <span class=\"font-semibold\">memegang teguh nilai-nilai Islam</span>, tidak terjebak dalam gaya hidup digital yang materialistik."
				}
			],
			quote: "Di era dimana teknologi bisa menjadi berkah atau bencana, ITMI hadir sebagai panduan bagaimana menjadi muslim yang cakap digital tanpa mengorbankan nilai-nilai agama.",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "ITMI adalah bagian dari Liquid Curriculum yang memiliki dua fungsi utama: sebagai metode preventif & kuratif untuk mudhorot teknologi, dan sebagai metode belajar IT yang efektif dengan strategi ajar unik berbasis mindset Islami.",
			categories: [
				"Agama Islam",
				"Teknologi"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-458-6",
			dimensions: "14 x 20 cm",
			pages: "xii + 311"
		},
		gallery: [
			"/img/ITMI/cover.jpg",
			"/img/ITMI/b-cover.jpg",
			"/img/ITMI/1.jpg",
			"/img/ITMI/2.jpg",
			"/img/ITMI/3.jpg",
			"/img/ITMI/4.jpg",
			"/img/ITMI/5.jpg"
		],
		cta: {
			title: "JANGAN BIARKAN GENERASI TERTINGGAL!",
			subtitle: "Bekali mereka dengan pemahaman teknologi yang benar berdasarkan nilai-nilai Islami",
			heading: "ISLAMIC TECHNOLOGY MINDSET INSTALLATION",
			bullets: [
				"Metode preventif & kuratif untuk mudhorot teknologi",
				"Metode belajar IT yang efektif dan lebih cepat",
				"Strategi ajar unik berbasis mindset Islami"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	},
	{
		slug: "lc",
		title: "Liquid Curriculum",
		short: "Liquid Curriculum",
		name: "Liquid Curriculum",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/LC",
		price: 187000,
		normalPrice: 200000,
		lynk: "https://gsiofficial.xyz/gsiofficial/rYM9yVK",
		shopee: "https://shopee.co.id/Liquid-Curicullum-Kurikulum-untuk-Sekolah-Impian-yang-Akan-Menghasilkan-Generasi-Impian-i.1344216734.28786791996",
		hero: {
			question: "GAGAL MENDIDIK GENERASI?",
			answer: "Ini Solusi Revolusionernya!",
			introHtml: "<p><span class=\"font-semibold\">Liquid Curriculum</span> membongkar kesalahan fatal sistem pendidikan modern dan mengungkap formula rahasia mencetak generasi <span class=\"font-bold\">berakhlak mulia, bermental kuat, dan produktif</span> dalam waktu singkat!</p>",
			warning: "PERINGATAN: Buku ini akan mengubah paradigma Anda tentang pendidikan!",
			cta: "BUKTIKAN SEKARANG!",
			mockup: "/img/LC/mockup-lc.png"
		},
		problems: {
			title: "MASALAH BESAR YANG ANDA HADAPI",
			subtitle: "Tanpa sadar, kita sedang menciptakan generasi yang lemah!",
			items: [
				{
					title: "Generasi Instant",
					text: "Anak-anak tumbuh dengan mental \"microwave\" - ingin segala sesuatu instan tanpa proses. Hasilnya? Generasi yang mudah menyerah dan tidak tahan tekanan."
				},
				{
					title: "Krisis Akhlak",
					text: "Nilai-nilai agama semakin tergerus, sementara pengaruh negatif teknologi merajalela. Orang tua dan guru kebingungan menghadapi degradasi moral yang terjadi begitu cepat."
				},
				{
					title: "Sistem Pendidikan Gagal",
					text: "Sekolah hanya fokus pada nilai akademik tanpa membangun karakter. Outputnya? Lulusan dengan ijazah mentereng tapi kosong jiwa dan lemah mental."
				}
			],
			alert: "APAKAH ANDA INGIN GENERASI ANDA MENJADI KORBAN SELANJUTNYA?"
		},
		solution: {
			title: "REVOLUSI PENDIDIKAN ISLAMI",
			subtitle: "Liquid Curriculum menghadirkan solusi yang belum pernah Anda dengar sebelumnya!",
			items: [
				{
					title: "Orientasi Dunia & Akhirat",
					html: "Tidak hanya bertujuan sukses dalam kehidupan dunia saja, tetapi juga mencapai kesuksesan akhirat secara seimbang. Pendidikan holistik yang memadukan keunggulan duniawi dan ukhrawi."
				},
				{
					title: "Integrasi Al-Qur'an",
					html: "Mengintegrasikan Al-Qur'an dengan teknologi, bahasa, dan karakter. Menciptakan generasi yang kuat iman sekaligus menguasai teknologi masa kini."
				},
				{
					title: "Pembangunan 3 Pilar Mental",
					html: "Membangun dan mengasah: <br> • <span class=\"font-semibold\">ITMI</span> (Islamic Technology Mindset Installation) <br> • <span class=\"font-semibold\">Mental belajar</span> (metakognitif) <br> • <span class=\"font-semibold\">K2IAM</span> (kreatif, kompetitif, inovatif, antisipatif, serta mampu memonetisasi)"
				}
			],
			quote: "Siapapun yang mendambakan lahirnya generasi impian baik Anda adalah seorang guru maupun orang tua, Liquid Curriculum adalah jawabannya Insya Allah",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "Tujuan pendidikan dari Liquid Curriculum adalah mencapai stabilisasi moral, mental, dan produktifitas lebih cepat. Siapapun yang mendambakan lahirnya generasi impian, baik anda adalah seorang guru maupun orang tua, Liquid Curriculum adalah jawabannya. InsyaAllah",
			categories: [
				"Pendidikan",
				"Parenting",
				"Islami"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-470-8",
			dimensions: "14 x 20 cm",
			pages: "x + 326"
		},
		gallery: [
			"/img/LC/cover.jpg",
			"/img/LC/b-cover.jpg",
			"/img/LC/1.jpg",
			"/img/LC/2.jpg"
		],
		cta: {
			title: "ANDA PILIH YANG MANA?",
			subtitle: "Teruskan sistem pendidikan usang yang jelas-jelas gagal, atau ambil tindakan sekarang untuk menyelamatkan generasi?",
			heading: "LIQUID CURRICULUM",
			bullets: [
				"Integrasi kurikulum Tahfidzul Quran, IT, Bahasa dan Karakter",
				"Berisi rumus sukses versi/ala Sekolah Impian",
				"Pendekatan interaktif, efektif, berbasis proyek dan sesuai dengan nilai dan Mindset Islam"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	},
	{
		slug: "st",
		title: "Sejarah Teknologi - Seri Teknologi Islami",
		short: "Sejarah Teknologi",
		name: "Sejarah Teknologi",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/ST",
		price: 121000,
		normalPrice: 150000,
		lynk: "https://gsiofficial.xyz/gsiofficial/glPZKz9",
		shopee: "https://shopee.co.id/Seri-Teknologi-Islami-Sejarah-Teknologi-dari-Perspektif-Kaum-Muslim-i.1344216734.40751654113",
		hero: {
			question: "SEJARAH TEKNOLOGI",
			answer: "Dari Perspektif Kaum Muslim",
			introHtml: "<p>Buku ini mengungkap sejarah jujur tentang bagaimana kaum muslimin <span class=\"font-bold\">memelopori kebangkitan teknologi</span> dunia dengan berpandu pada Al-Quran, serta bagaimana khazanah keilmuan ini berpindah ke Barat dan apa yang harus kita lakukan sekarang.</p>",
			warning: "PERINGATAN: Buku ini akan mengubah pandangan Anda tentang sejarah teknologi!",
			cta: "BUKU SEKARANG!",
			mockup: "/img/ST/mockup-st.png"
		},
		problems: {
			title: "MASALAH YANG KITA HADAPI",
			subtitle: "Generasi muslim hari ini tidak menyadari warisan teknologi mereka yang gemilang!",
			items: [
				{
					title: "Sejarah yang Terdistorsi",
					text: "Sejarah teknologi sering ditulis dari perspektif Barat yang mengabaikan kontribusi besar ilmuwan muslim. Banyak penemuan penting yang sebenarnya berasal dari dunia Islam."
				},
				{
					title: "Hilangnya Identitas",
					text: "Generasi muda muslim tidak lagi bangga dengan warisan keilmuan mereka sendiri. Mereka lebih mengenal ilmuwan Barat daripada ilmuwan muslim seperti Al-Khwarizmi, Ibnu Sina, atau Al-Jazari."
				},
				{
					title: "Krisis Motivasi",
					text: "Tanpa pengetahuan tentang kontribusi sejarah mereka, generasi muslim kehilangan motivasi untuk kembali unggul dalam bidang teknologi dan sains."
				}
			],
			alert: "APAKAH KITA AKAN TERUS MENJADI PENONTON DALAM PERKEMBANGAN TEKNOLOGI?"
		},
		solution: {
			title: "APA YANG ANDA TEMUKAN DALAM BUKU INI?",
			subtitle: "Panduan revolusioner pengajaran IT berbasis nilai Islam",
			items: [
				{
					title: "Prolog Mengajar IT Islami",
					html: "Dimulai dari pengalaman mengajar mata pelajaran Teknologi Informasi di Sekolah Impian, buku ini membongkar paradigma pengajaran IT konvensional dan menggantinya dengan pendekatan berbasis nilai-nilai Islam yang holistik."
				},
				{
					title: "Integrasi Al-Qur'an & Teknologi",
					html: "Metode unik mengintegrasikan Al-Qur'an dengan pembelajaran teknologi modern. Bagaimana menjadikan ayat-ayat kauniyah sebagai landasan pengembangan teknologi sekaligus filter terhadap dampak negatif kemajuan digital."
				},
				{
					title: "Sejarah Teknologi Islami",
					html: "Dokumentasi komprehensif tentang kontribusi masif ilmuwan muslim dalam perkembangan teknologi dunia - dari Al-Jazari (bapak robotika), Al-Khawarizmi (algoritma), hingga Ibnu Firnas (penerbangan). Membongkar distorsi sejarah yang selama ini terjadi."
				}
			],
			quote: "Buku ini bukan sekadar teori, tapi panduan praktis bagaimana mencetak generasi yang menguasai teknologi tanpa tercerabut dari akar keislamannya",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "Buku ini mengungkap sejarah jujur tentang keterlibatan kaum muslimin dalam mempelopori kebangkitan teknologi, bagaimana mereka menjaga khazanah keilmuan peradaban masa lalu, dan bagaimana semangat ini bisa kita hidupkan kembali.",
			categories: [
				"Agama Islam",
				"Sejarah",
				"Teknologi"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-466-1",
			dimensions: "14 x 20 cm",
			pages: "x + 156"
		},
		gallery: [
			"/img/ST/cover.jpg",
			"/img/ST/b-cover.jpg",
			"/img/ST/1.jpg",
			"/img/ST/2.jpg",
			"/img/ST/3.jpg",
			"/img/ST/4.jpg"
		],
		cta: {
			title: "BANGKITKAN SEMANGAT TEKNOLOGI ISLAMI",
			subtitle: "Miliki buku ini sekarang dan temukan bagaimana kaum muslimin bisa kembali memimpin di bidang teknologi!",
			heading: "SEJARAH TEKNOLOGI",
			bullets: [
				"Mengungkap kontribusi nyata ilmuwan muslim dalam perkembangan teknologi dunia",
				"Menjelaskan metode penelitian islami yang menghasilkan penemuan-penemuan penting",
				"Memberikan panduan bagaimana generasi muslim bisa kembali unggul di bidang teknologi"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	},
	{
		slug: "mbt",
		title: "Mental Belajar Teknologi - Seri Teknologi Islami",
		short: "Mental Belajar Teknologi",
		name: "Mental Belajar Teknologi",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/BT",
		price: 105000,
		normalPrice: 150000,
		lynk: "https://gsiofficial.xyz/gsiofficial/9QGJL29",
		shopee: "https://shopee.co.id/Seri-Teknologi-Islam-Mental-Belajar-i.1344216734.42801659863",
		hero: {
			question: "MENTAL BELAJAR",
			answer: "TEKNOLOGI",
			introHtml: "<p>Teknologi bagaikan kotak pandora, di dalamnya terdapat keburukan dan manfaat. <span class=\"font-bold\">Buku ini menjadi penting bagi pendidik</span> (orang tua dan guru) karena di dalamnya terdapat langkah demi langkah untuk membangun mental berteknologi yang tangguh.</p>",
			warning: "PERINGATAN: Buku ini akan mengubah cara pandang Anda tentang pendidikan teknologi!",
			cta: "BUKU SEKARANG!",
			mockup: "/img/BT/cover.jpg"
		},
		problems: {
			title: "MASALAH YANG KITA HADAPI",
			subtitle: "Generasi muda muslim seringkali tidak memiliki mental yang tepat dalam menghadapi teknologi!",
			items: [
				{
					title: "Ketergantungan Teknologi",
					text: "Anak-anak dan remaja muslim sering terjebak dalam penggunaan teknologi yang berlebihan tanpa mampu mengendalikannya, menyebabkan ketergantungan dan produktivitas menurun."
				},
				{
					title: "Kurangnya Filter Konten",
					text: "Tanpa mental yang kuat, generasi muda mudah terpapar konten negatif dan tidak sesuai nilai Islam karena tidak memiliki filter yang baik dalam menggunakan teknologi."
				},
				{
					title: "Tidak Produktif",
					text: "Banyak yang hanya menjadi konsumen teknologi tanpa mampu memanfaatkannya untuk hal produktif, apalagi menghasilkan nilai ekonomi dari teknologi."
				}
			],
			alert: "APAKAH KITA AKAN TERUS MEMBIARKAN GENERASI MUDA TERCERABUT DARI NILAI ISLAMI DALAM BERteknologi?"
		},
		solution: {
			title: "APA YANG ANDA TEMUKAN DALAM BUKU INI?",
			subtitle: "Panduan membangun mental belajar teknologi yang Islami",
			items: [
				{
					title: "Cara Membangun Mental yang Tangguh",
					html: "Buku ini mengungkap teknik-teknik praktis untuk mengembangkan ketahanan mental dalam menghadapi tantangan teknologi modern. Anda akan belajar cara membangun disiplin diri, fokus, dan ketangguhan dalam menggunakan teknologi secara bijak."
				},
				{
					title: "Pondasi Berteknologi yang Islami",
					html: "Temukan prinsip-prinsip dasar dalam berteknologi yang sesuai nilai Islam. Buku ini mengajarkan bagaimana menciptakan filter internal untuk menjauhi keburukan teknologi sekaligus memaksimalkan manfaatnya untuk kebaikan diri dan masyarakat."
				},
				{
					title: "Strategi Belajar yang Efektif",
					html: "Pelajari metode pembelajaran teknologi yang efektif berdasarkan penelitian neurosains dan prinsip Islam. Dari teknik konsentrasi, manajemen waktu, hingga pendekatan belajar berbasis proyek yang menginspirasi kreativitas dan inovasi."
				}
			],
			quote: "Buku ini tidak hanya teori, tapi memberikan peta jalan konkrit untuk membentuk generasi yang tangguh dalam menghadapi era digital tanpa kehilangan jati diri sebagai muslim",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "Buku ini menjadi penting bagi pendidik (orang tua dan guru) karena di dalamnya terdapat langkah demi langkah untuk membangun \"mental-mental berteknologi\" yang tangguh, produktif, dan sesuai nilai-nilai Islam.",
			categories: [
				"Agama Islam",
				"Pendidikan",
				"Teknologi"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-460-9",
			dimensions: "14 x 20 cm",
			pages: "x + 114"
		},
		gallery: [
			"/img/BT/cover.jpg",
			"/img/BT/b-cover.jpg",
			"/img/BT/1.jpg",
			"/img/BT/2.jpg"
		],
		cta: {
			title: "BANGUN MENTAL TEKNOLOGI YANG ISLAMI",
			subtitle: "Miliki buku ini sekarang dan bantu generasi muda muslim menghadapi tantangan teknologi dengan mental yang kuat!",
			heading: "MENTAL BELAJAR TEKNOLOGI",
			bullets: [
				"Panduan membangun mental menjauhi keburukan teknologi",
				"Mengembangkan mental fokus pada manfaat teknologi",
				"Langkah praktis membentuk mental produktif dan monetitatif dalam berteknologi"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	},
	{
		slug: "it-pf",
		title: "IT Dengan Proyek Festival",
		short: "IT Dengan Proyek Festival",
		name: "IT Dengan Proyek Festival",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/IT-PF",
		price: 121000,
		normalPrice: 150000,
		lynk: "https://gsiofficial.xyz/gsiofficial/ep5AkLv",
		shopee: "https://shopee.co.id/Seri-Teknologi-Islami-IT-dengan-Proyek-Festival-i.1344216734.43501664649",
		hero: {
			question: "EFEKTIVITAS PEMBELAJARAN IT",
			answer: "DENGAN PROYEK FESTIVAL!",
			introHtml: "<p><span class=\"font-semibold\">IT Dengan Proyek Festival</span> membahas strategi pembelajaran berbasis proyek dengan <span class=\"font-bold\">persentase keberhasilan 85%</span> dibanding pembelajaran teori saja yang hanya 55%.</p>",
			warning: "PERINGATAN: Buku ini akan mengubah metode pengajaran IT Anda!",
			cta: "BUKTIKAN SEKARANG!",
			mockup: "/img/IT-PF/mockup-it-pf.png"
		},
		problems: {
			title: "MASALAH PEMBELAJARAN IT KONVENSIONAL",
			subtitle: "Pembelajaran IT tanpa praktik yang memadai menghasilkan pemahaman yang dangkal!",
			items: [
				{
					title: "Teori Tanpa Praktik",
					text: "Banyak pembelajaran IT hanya berfokus pada teori tanpa jam praktik yang memadai. Hasilnya, siswa kesulitan mengaplikasikan pengetahuan."
				},
				{
					title: "Keberhasilan Rendah",
					text: "Pembelajaran teori saja hanya memiliki tingkat keberhasilan 55%, jauh lebih rendah dibanding pembelajaran dengan praktik (85%)."
				},
				{
					title: "Guru Kurang Terlatih",
					text: "Banyak guru IT belum terlatih dalam menciptakan dan mengawal proyek-proyek praktik yang efektif bagi siswa."
				}
			],
			alert: "APAKAH ANDA INGIN METODE PENGAJARAN IT ANDA TETAP KONVENSIONAL?"
		},
		solution: {
			title: "SOLUSI REVOLUSIONER PEMBELAJARAN IT",
			subtitle: "Transformasi pembelajaran IT dengan pendekatan berbasis proyek yang interaktif dan efektif!",
			items: [
				{
					title: "Solusi Dasar Mapel IT di Indonesia",
					html: "Buku ini memberikan solusi fundamental untuk memperbaiki kualitas pembelajaran IT di Indonesia, mulai dari kurikulum hingga metode pengajaran yang lebih aplikatif dan relevan dengan kebutuhan industri."
				},
				{
					title: "Peningkatan Kualitas Guru IT",
					html: "Panduan komprehensif untuk meningkatkan kompetensi guru IT, meliputi penguasaan materi, metodologi pengajaran modern, dan kemampuan membimbing proyek-proyek praktik siswa secara efektif."
				},
				{
					title: "Sistem Pembelajaran Interaktif",
					html: "Pendekatan pembelajaran IT yang revolusioner berbasis proyek, menciptakan pengalaman belajar yang lebih interaktif, menyenangkan, dan berdampak nyata bagi pengembangan kompetensi siswa."
				}
			],
			quote: "Efektivitas pembelajaran IT membutuhkan strategi praktik yang baik - dengan pendekatan berbasis proyek mencapai 85% keberhasilan, jauh melampaui metode teori saja (55%). Buku ini menjadi panduan lengkap untuk menjalankan pembelajaran berbasis proyek sekaligus meningkatkan kualitas guru dalam menciptakan dan mengawal proyek-proyek IT.",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "Buku ini membahas tentang bagaimana menjalankan strategi pembelajaran berbasis project. Buku ini juga membahas tentang peningkatan kualitas guru agar mampu menciptakan dan mengawal proyek-proyek di mapel IT dengan efektivitas mencapai 85%.",
			categories: [
				"Agama Islam",
				"Teknologi",
				"Pendidikan"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-460-9",
			dimensions: "14 x 20 cm",
			pages: "x + 114"
		},
		gallery: [
			"/img/IT-PF/cover.jpg",
			"/img/IT-PF/b-cover.jpg",
			"/img/IT-PF/1.jpg",
			"/img/IT-PF/2.jpg"
		],
		cta: {
			title: "TRANSFORMASI METODE PENGAJARAN IT ANDA!",
			subtitle: "Tetap menggunakan metode konvensional dengan efektivitas 55%, atau beralih ke pembelajaran berbasis proyek dengan efektivitas 85%?",
			heading: "IT DENGAN PROYEK FESTIVAL",
			bullets: [
				"Strategi pembelajaran berbasis proyek",
				"Peningkatan kualitas guru IT",
				"Tingkat keberhasilan pembelajaran 85%"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	},
	{
		slug: "it-bp",
		title: "IT Berorientasi Produktif",
		short: "IT Berorientasi Produktif",
		name: "IT Berorientasi Produktif",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/IT-BP",
		price: 93000,
		normalPrice: 125000,
		lynk: "https://gsiofficial.xyz/gsiofficial/oPNVqAV",
		shopee: "https://shopee.co.id/Seri-Teknologi-Islami-IT-Berorientasi-Produktif-i.1344216734.41351680050",
		hero: {
			question: "BELAJAR IT TANPA HASIL?",
			answer: "Ini Solusi Produktifnya!",
			introHtml: "<p><span class=\"font-semibold\">IT Berorientasi Produktif</span> membongkar kesalahan fatal pembelajaran IT konvensional dan mengungkap cara <span class=\"font-bold\">belajar sambil menghasilkan karya nyata</span> yang bisa menjadi portofolio!</p>",
			warning: "PERINGATAN: Buku ini akan mengubah cara Anda belajar IT!",
			cta: "BUKTIKAN SEKARANG!",
			mockup: "/img/IT-BP/mockup-it-bp.png"
		},
		problems: {
			title: "MASALAH BESAR DI DUNIA IT",
			subtitle: "Banyak belajar IT tapi tidak menghasilkan karya nyata!",
			items: [
				{
					title: "Belajar Tanpa Output",
					text: "Banyak pelajar IT hanya fokus pada teori tanpa membuat proyek nyata. Hasilnya? Pengetahuan luas tapi tidak bisa menciptakan produk yang berguna."
				},
				{
					title: "Kurang Portofolio",
					text: "Perusahaan sekarang lebih melihat portofolio daripada ijazah. Tanpa proyek nyata, sulit bersaing di dunia kerja yang kompetitif."
				},
				{
					title: "Tidak Produktif",
					text: "Pembelajaran IT konvensional tidak mendorong produktivitas. Siswa hanya mengerjakan tugas tanpa menciptakan sesuatu yang bernilai."
				}
			],
			alert: "APAKAH ANDA KHAWATIR KETERAMPILAN IT ANDA TIDAK BERMANFAAT?"
		},
		solution: {
			title: "REVOLUSI PEMBELAJARAN IT ISLAMI",
			subtitle: "IT Berorientasi Produktif menghadirkan solusi yang belum pernah Anda dengar sebelumnya!",
			items: [
				{
					title: "Dasar-Dasar Teknologi",
					html: "Pengenalan fundamental tentang dunia teknologi modern. Mulai dari pemahaman hardware, software, hingga konsep dasar pemrograman yang disajikan dengan pendekatan Islami."
				},
				{
					title: "Metode Belajar Gen Z",
					html: "Memahami karakteristik dan cara belajar generasi digital native. Teknik pembelajaran yang efektif dengan memanfaatkan teknologi namun tetap berlandaskan nilai-nilai Islam."
				},
				{
					title: "Pendidikan Karakter Digital",
					html: "Membentuk peserta didik yang mandiri, kritis, dan bertanggung jawab di era digital. Mengembangkan kemampuan berpikir analitis dan kreativitas dengan tetap menjaga akhlak Islami."
				}
			],
			quote: "Di era dimana portofolio lebih bernilai daripada ijazah, saat perusahaan bertanya 'Berapa proyek yang sudah Anda buat?', buku ini menjadi panduan penting untuk membimbing siswa menciptakan produk nyata. Mari dorong generasi kita untuk berinovasi dan berkarya!",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "Jaman sudah berubah, portofolio menjadi lebih penting daripada ijazah. Buku ini memandu guru dan orangtua untuk menuntun tahap demi tahap agar anak dan siswa kita belajar IT secara produktif dengan membuat proyek-proyek nyata.",
			categories: [
				"Agama Islam",
				"Teknologi",
				"Pendidikan"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-460-9",
			dimensions: "14 x 20 cm",
			pages: "x + 114"
		},
		gallery: [
			"/img/IT-BP/cover.jpg",
			"/img/IT-BP/b-cover.jpg",
			"/img/IT-BP/1.jpg",
			"/img/IT-BP/2.jpg"
		],
		cta: {
			title: "ANDA PILIH YANG MANA?",
			subtitle: "Teruskan belajar IT tanpa hasil nyata, atau ambil tindakan sekarang untuk mulai membangun portofolio?",
			heading: "IT BERORIENTASI PRODUKTIF",
			bullets: [
				"Pembelajaran berbasis proyek nyata",
				"Panduan membangun portofolio IT",
				"Mindset produktif ala Islam"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	},
	{
		slug: "it-bm",
		title: "IT Berorientasi Monetitatif",
		short: "IT Berorientasi Monetitatif",
		name: "IT Berorientasi Monetitatif",
		author: "Ustadz Purwanto Abdul Ghaffar",
		img: "/img/IT-BM",
		price: 117000,
		normalPrice: 150000,
		lynk: "https://gsiofficial.xyz/gsiofficial/xQAKrGZ",
		shopee: "https://shopee.co.id/Seri-Teknologi-Islami-IT-Berorientasi-Monetitatif-i.1344216734.43551675445",
		hero: {
			question: "MENGUASAI TEKNOLOGI TANPA HASIL?",
			answer: "Ini Rahasia Monetisasinya!",
			introHtml: "<p><span class=\"font-semibold\">IT Berorientasi Monetitatif</span> membongkar rahasia untuk menjadikan anak tidak hanya kreatif dan inovatif namun juga memiliki kemampuan untuk menghasilkan pendapatan dari skill teknologi <span class=\"font-bold\">dengan pendekatan Islami yang halal dan berkah</span>.</p>",
			warning: "PERINGATAN: Buku ini akan mengubah cara pandang Anda tentang pembelajaran IT!",
			cta: "BUKTIKAN SEKARANG!",
			mockup: "/img/IT-BM/mockup-it-bm.png"
		},
		problems: {
			title: "MASALAH BESAR DI DUNIA IT",
			subtitle: "Banyak ahli IT tapi sedikit yang bisa menghasilkan!",
			items: [
				{
					title: "Skill Tanpa Monetisasi",
					text: "Banyak pelajar IT hanya fokus pada penguasaan teknis tanpa mempelajari cara menghasilkan uang dari skill mereka. Hasilnya? Pengangguran terselubung di bidang IT."
				},
				{
					title: "Mindset Karyawan",
					text: "Pendidikan IT konvensional hanya mencetak pencari kerja, bukan pencipta lapangan kerja. Mental karyawan yang terbentuk membuat lulusan hanya bisa mengandalkan gaji bulanan."
				},
				{
					title: "Tidak Islami",
					text: "Banyak peluang monetisasi IT yang bertentangan dengan syariat Islam. Tanpa panduan yang jelas, mudah terjebak pada penghasilan yang tidak halal dan tidak berkah."
				}
			],
			alert: "APAKAH ANDA INGIN KETERAMPILAN IT ANDA TIDAK MENGHASILKAN?"
		},
		solution: {
			title: "REVOLUSI PEMBELAJARAN IT ISLAMI",
			subtitle: "IT Berorientasi Monetitatif menghadirkan solusi yang belum pernah Anda dengar sebelumnya!",
			items: [
				{
					title: "Instalasi Skill Teknologi",
					html: "Cara untuk menginstal skill teknologi dengan semangat produktivitas. Buku ini mengajarkan pendekatan sistematis dalam mempelajari teknologi dengan orientasi output yang langsung bisa dimanfaatkan."
				},
				{
					title: "Monetisasi Keterampilan",
					html: "Bagaimana cara mendapatkan pendapatan lewat teknologi. Mulai dari freelance, pembuatan produk digital, hingga membangun bisnis teknologi yang halal dan sesuai syariat Islam."
				},
				{
					title: "Pendidikan Technopreneur",
					html: "Bagaimana cara menanam dan mengasah keterampilan teknologi, monetisasi, dan technopreneurship dalam diri peserta didik. Membangun generasi yang tidak hanya menguasai teknologi tapi juga mampu memanfaatkannya secara ekonomi."
				}
			],
			quote: "Di era digital ini, penguasaan teknologi adalah kunci kesuksesan finansial. Buku ini membentuk mindset technopreneur - mengajak siswa tidak hanya mencipta produk teknologi, tetapi juga menguasai seni memonetisasinya. Inilah pendidikan IT yang sesungguhnya!",
			quoteBy: "Ustadz Purwanto Abdul Ghaffar"
		},
		specs: {
			description: "Keahlian teknologi menjadi salah satu kunci utama untuk meraih kesuksesan finansial. Monetisasi harus menjadi target pembelajaran, sehingga pelajar di bidang IT selalu berpikir tentang bagaimana cara menghasilkan pendapatan dari teknologi.",
			categories: [
				"Agama Islam",
				"Teknologi",
				"Bisnis"
			],
			publisher: "Bintang Semesta Media",
			language: "Indonesia",
			isbn: "978-623-129-460-9",
			dimensions: "14 x 20 cm",
			pages: "x + 114"
		},
		gallery: [
			"/img/IT-BM/cover.jpg",
			"/img/IT-BM/b-cover.jpg",
			"/img/IT-BM/1.jpg",
			"/img/IT-BM/2.jpg",
			"/img/IT-BM/3.jpg"
		],
		cta: {
			title: "ANDA PILIH YANG MANA?",
			subtitle: "Teruskan belajar IT tanpa tujuan jelas, atau ambil tindakan sekarang untuk mengubah skill IT menjadi sumber penghasilan?",
			heading: "IT BERORIENTASI MONETITATIF",
			bullets: [
				"Panduan monetisasi skill IT secara Islami",
				"Membangun mindset technopreneur sejak dini",
				"Strategi menghasilkan dari teknologi yang halal dan berkah"
			],
			promo: "PROMO TERBATAS! Hanya untuk 50 pembeli pertama bulan ini"
		}
	}
];

export const bookBySlug = new Map(books.map((b) => [b.slug, b]));

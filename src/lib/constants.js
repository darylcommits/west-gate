export const PROPERTY_TYPES = [
  { value: 'house_and_lot', label: 'House and Lot' },
  { value: 'lot_only', label: 'Lot Only' },
  { value: 'condominium', label: 'Condominium' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'farm_lot', label: 'Farm Lot' },
  { value: 'townhouse', label: 'Townhouse' },
];
 
export const PROVINCES = [
  // NCR
  'Metro Manila',
 
  // Region I - Ilocos Region
  'Ilocos Norte',
  'Ilocos Sur',
  'La Union',
  'Pangasinan',
 
  // Region II - Cagayan Valley
  'Batanes',
  'Cagayan',
  'Isabela',
  'Nueva Vizcaya',
  'Quirino',
 
  // Region III - Central Luzon
  'Aurora',
  'Bataan',
  'Bulacan',
  'Nueva Ecija',
  'Pampanga',
  'Tarlac',
  'Zambales',
 
  // Region IV-A - CALABARZON
  'Batangas',
  'Cavite',
  'Laguna',
  'Quezon',
  'Rizal',
 
  // MIMAROPA
  'Marinduque',
  'Occidental Mindoro',
  'Oriental Mindoro',
  'Palawan',
  'Romblon',
 
  // Region V - Bicol Region
  'Albay',
  'Camarines Norte',
  'Camarines Sur',
  'Catanduanes',
  'Masbate',
  'Sorsogon',
 
  // Region VI - Western Visayas
  'Aklan',
  'Antique',
  'Capiz',
  'Guimaras',
  'Iloilo',
  'Negros Occidental',
 
  // Region VII - Central Visayas
  'Bohol',
  'Cebu',
  'Negros Oriental',
  'Siquijor',
 
  // Region VIII - Eastern Visayas
  'Biliran',
  'Eastern Samar',
  'Leyte',
  'Northern Samar',
  'Samar',
  'Southern Leyte',
 
  // Region IX - Zamboanga Peninsula
  'Zamboanga del Norte',
  'Zamboanga del Sur',
  'Zamboanga Sibugay',
 
  // Region X - Northern Mindanao
  'Bukidnon',
  'Camiguin',
  'Lanao del Norte',
  'Misamis Occidental',
  'Misamis Oriental',
 
  // Region XI - Davao Region
  'Davao de Oro',
  'Davao del Norte',
  'Davao del Sur',
  'Davao Occidental',
  'Davao Oriental',
 
  // Region XII - SOCCSKSARGEN
  'Cotabato',
  'Sarangani',
  'South Cotabato',
  'Sultan Kudarat',
 
  // Region XIII - Caraga
  'Agusan del Norte',
  'Agusan del Sur',
  'Dinagat Islands',
  'Surigao del Norte',
  'Surigao del Sur',
 
  // CAR - Cordillera Administrative Region
  'Abra',
  'Apayao',
  'Benguet',
  'Ifugao',
  'Kalinga',
  'Mountain Province',
 
  // BARMM
  'Basilan',
  'Lanao del Sur',
  'Maguindanao del Norte',
  'Maguindanao del Sur',
  'Sulu',
  'Tawi-Tawi',
];
 
export const CITIES_BY_PROVINCE = {
  'Metro Manila': [
    'Manila', 'Quezon City', 'Caloocan', 'Las Piñas', 'Makati',
    'Malabon', 'Mandaluyong', 'Marikina', 'Muntinlupa', 'Navotas',
    'Parañaque', 'Pasay', 'Pasig', 'San Juan', 'Taguig',
    'Valenzuela', 'Pateros'
  ],
 
  'Ilocos Norte': [
    'Laoag City', 'Batac City', 'Bacarra', 'Badoc', 'Bangui',
    'Banna', 'Burgos', 'Carasi', 'Currimao', 'Dingras',
    'Dumalneg', 'Marcos', 'Nueva Era', 'Pagudpud', 'Paoay',
    'Pasuquin', 'Piddig', 'Pinili', 'San Nicolas', 'Sarrat',
    'Solsona', 'Vintar'
  ],
  'Ilocos Sur': [
    'Vigan City', 'Candon City', 'Bantay', 'Burgos', 'Cabugao', 'Caoayan',
    'Cervantes', 'Galimuyod', 'Gregorio del Pilar', 'Lidlidda', 'Magsingal',
    'Nagbukel', 'Narvacan', 'Quirino', 'Salcedo', 'San Emilio',
    'San Esteban', 'San Ildefonso', 'San Juan', 'San Vicente',
    'Santa', 'Santa Catalina', 'Santa Cruz', 'Santa Lucia', 'Santa Maria',
    'Santiago', 'Santo Domingo', 'Sigay', 'Sinait', 'Sugpon',
    'Suyo', 'Tagudin'
  ],
  'La Union': [
    'San Fernando City', 'Agoo', 'Aringay', 'Bacnotan', 'Bagulin',
    'Balaoan', 'Bangar', 'Bauang', 'Burgos', 'Caba',
    'Luna', 'Naguilian', 'Pugo', 'Rosario', 'San Gabriel',
    'San Juan', 'Santo Tomas', 'Santol', 'Sudipen', 'Tubao'
  ],
  'Pangasinan': [
    'Alaminos City', 'Dagupan City', 'San Carlos City', 'Urdaneta City',
    'Agno', 'Aguilar', 'Alcala', 'Anda', 'Asingan', 'Balungao',
    'Bani', 'Basista', 'Bautista', 'Bayambang', 'Binalonan',
    'Binmaley', 'Bolinao', 'Bugallon', 'Burgos', 'Calasiao',
    'Dasol', 'Infanta', 'Labrador', 'Laoac', 'Lingayen',
    'Mabini', 'Malasiqui', 'Manaoag', 'Mangaldan', 'Mangatarem',
    'Mapandan', 'Natividad', 'Pozorrubio', 'Rosales', 'San Fabian',
    'San Jacinto', 'San Manuel', 'San Nicolas', 'San Quintin',
    'Santa Barbara', 'Santa Maria', 'Santo Tomas', 'Sison', 'Sual',
    'Tayug', 'Umingan', 'Urbiztondo', 'Villasis'
  ],
 
  'Batanes': [
    'Basco', 'Itbayat', 'Ivana', 'Mahatao', 'Sabtang', 'Uyugan'
  ],
  'Cagayan': [
    'Tuguegarao City', 'Abulug', 'Alcala', 'Allacapan', 'Amulung',
    'Aparri', 'Baggao', 'Ballesteros', 'Buguey', 'Calayan',
    'Camalaniugan', 'Claveria', 'Enrile', 'Gattaran', 'Gonzaga',
    'Iguig', 'Lal-lo', 'Lasam', 'Pamplona', 'Peñablanca',
    'Piat', 'Rizal', 'Sanchez-Mira', 'Santa Ana', 'Santa Praxedes',
    'Santa Teresita', 'Santo Niño', 'Solana', 'Tuao'
  ],
  'Isabela': [
    'Ilagan City', 'Cauayan City', 'Santiago City', 'Alicia', 'Angadanan',
    'Aurora', 'Benito Soliven', 'Burgos', 'Cabagan', 'Cabatuan',
    'Delfin Albano', 'Dinapigue', 'Divilacan', 'Echague', 'Gamu',
    'Jones', 'Luna', 'Maconacon', 'Mallig', 'Naguilian',
    'Palanan', 'Quezon', 'Quirino', 'Ramon', 'Reina Mercedes',
    'Roxas', 'San Agustin', 'San Guillermo', 'San Isidro', 'San Manuel',
    'San Mariano', 'San Mateo', 'San Pablo', 'Santa Maria', 'Santo Tomas',
    'Tumauini'
  ],
  'Nueva Vizcaya': [
    'Bayombong', 'Ambaguio', 'Aritao', 'Bagabag', 'Bambang',
    'Diadi', 'Dupax del Norte', 'Dupax del Sur', 'Kasibu', 'Kayapa',
    'Quezon', 'Santa Fe', 'Solano', 'Villaverde'
  ],
  'Quirino': [
    'Cabarroguis', 'Aglipay', 'Diffun', 'Maddela', 'Nagtipunan', 'Saguday'
  ],
 
  'Aurora': [
    'Baler', 'Casiguran', 'Dilasag', 'Dinalungan', 'Dingalan',
    'Dipaculao', 'Maria Aurora', 'San Luis'
  ],
  'Bataan': [
    'Balanga City', 'Abucay', 'Bagac', 'Dinalupihan', 'Hermosa',
    'Limay', 'Mariveles', 'Morong', 'Orani', 'Orion', 'Pilar', 'Samal'
  ],
  'Bulacan': [
    'Malolos City', 'Meycauayan City', 'San Jose del Monte City',
    'Angat', 'Balagtas', 'Baliuag', 'Bocaue', 'Bulakan', 'Bustos',
    'Calumpit', 'Doña Remedios Trinidad', 'Guiguinto', 'Hagonoy',
    'Marilao', 'Norzagaray', 'Obando', 'Pandi', 'Paombong',
    'Plaridel', 'Pulilan', 'San Ildefonso', 'San Miguel', 'San Rafael',
    'Santa Maria'
  ],
  'Nueva Ecija': [
    'Cabanatuan City', 'Gapan City', 'Muñoz City', 'Palayan City', 'San Jose City',
    'Aliaga', 'Bongabon', 'Cabiao', 'Carranglan', 'Cuyapo',
    'Gabaldon', 'General Mamerto Natividad', 'General Tinio', 'Guimba',
    'Jaen', 'Laur', 'Licab', 'Llanera', 'Lupao', 'Nampicuan',
    'Pantabangan', 'Peñaranda', 'Quezon', 'Rizal', 'San Antonio',
    'San Isidro', 'San Leonardo', 'Santa Rosa', 'Santo Domingo',
    'Talavera', 'Talugtug', 'Zaragoza'
  ],
  'Pampanga': [
    'San Fernando City', 'Angeles City', 'Mabalacat City',
    'Apalit', 'Arayat', 'Bacolor', 'Candaba', 'Floridablanca',
    'Guagua', 'Lubao', 'Macabebe', 'Magalang', 'Masantol',
    'Mexico', 'Minalin', 'Porac', 'San Luis', 'San Simon',
    'Santa Ana', 'Santa Rita', 'Santo Tomas', 'Sasmuan'
  ],
  'Tarlac': [
    'Tarlac City', 'Anao', 'Bamban', 'Camiling', 'Capas',
    'Concepcion', 'Gerona', 'La Paz', 'Mayantoc', 'Moncada',
    'Paniqui', 'Pura', 'Ramos', 'San Clemente', 'San Jose',
    'San Manuel', 'Santa Ignacia', 'Victoria'
  ],
  'Zambales': [
    'Olongapo City', 'Iba', 'Botolan', 'Cabangan', 'Candelaria',
    'Castillejos', 'Masinloc', 'Palauig', 'San Antonio', 'San Felipe',
    'San Marcelino', 'San Narciso', 'Santa Cruz', 'Subic'
  ],
 
  'Batangas': [
    'Batangas City', 'Lipa City', 'Tanauan City',
    'Agoncillo', 'Alitagtag', 'Balayan', 'Balete', 'Bauan',
    'Calaca', 'Calatagan', 'Cuenca', 'Ibaan', 'Laurel',
    'Lemery', 'Lian', 'Lobo', 'Mabini', 'Malvar',
    'Mataasnakahoy', 'Nasugbu', 'Padre Garcia', 'Rosario', 'San Jose',
    'San Juan', 'San Luis', 'San Nicolas', 'San Pascual', 'Santa Teresita',
    'Santo Tomas', 'Taal', 'Talisay', 'Taysan', 'Tingloy', 'Tuy'
  ],
  'Cavite': [
    'Bacoor City', 'Cavite City', 'Dasmariñas City', 'General Trias City',
    'Imus City', 'Tagaytay City', 'Trece Martires City',
    'Alfonso', 'Amadeo', 'Carmona', 'General Emilio Aguinaldo',
    'General Mariano Alvarez', 'Indang', 'Kawit', 'Magallanes',
    'Maragondon', 'Mendez', 'Naic', 'Noveleta', 'Rosario',
    'Silang', 'Tanza', 'Ternate'
  ],
  'Laguna': [
    'Biñan City', 'Cabuyao City', 'Calamba City', 'San Pablo City',
    'San Pedro City', 'Santa Rosa City',
    'Alaminos', 'Bay', 'Calauan', 'Cavinti', 'Famy',
    'Kalayaan', 'Liliw', 'Los Baños', 'Luisiana', 'Lumban',
    'Mabitac', 'Magdalena', 'Majayjay', 'Nagcarlan', 'Paete',
    'Pagsanjan', 'Pakil', 'Pangil', 'Pila', 'Rizal', 'Santa Cruz',
    'Santa Maria', 'Siniloan', 'Victoria'
  ],
  'Quezon': [
    'Lucena City', 'Tayabas City',
    'Agdangan', 'Alabat', 'Atimonan', 'Buenavista', 'Burdeos',
    'Calauag', 'Candelaria', 'Catanauan', 'Dolores', 'General Luna',
    'General Nakar', 'Guinayangan', 'Gumaca', 'Infanta', 'Jomalig',
    'Lopez', 'Lucban', 'Macalelon', 'Mauban', 'Mulanay',
    'Padre Burgos', 'Pagbilao', 'Panukulan', 'Patnanungan', 'Perez',
    'Pitogo', 'Plaridel', 'Polillo', 'Quezon', 'Real', 'Sampaloc',
    'San Andres', 'San Antonio', 'San Francisco', 'San Narciso',
    'Sariaya', 'Tagkawayan', 'Tiaong', 'Unisan'
  ],
  'Rizal': [
    'Antipolo City',
    'Angono', 'Baras', 'Binangonan', 'Cainta', 'Cardona',
    'Jalajala', 'Morong', 'Pililla', 'Rodriguez', 'San Mateo',
    'Tanay', 'Taytay', 'Teresa'
  ],
 
  'Marinduque': [
    'Boac', 'Buenavista', 'Gasan', 'Mogpog', 'Santa Cruz', 'Torrijos'
  ],
  'Occidental Mindoro': [
    'Mamburao', 'Abra de Ilog', 'Calintaan', 'Looc', 'Lubang',
    'Magsaysay', 'Paluan', 'Rizal', 'Sablayan', 'San Jose', 'Santa Cruz'
  ],
  'Oriental Mindoro': [
    'Calapan City',
    'Baco', 'Bansud', 'Bongabong', 'Bulalacao', 'Gloria',
    'Mansalay', 'Naujan', 'Pinamalayan', 'Pola', 'Puerto Galera',
    'Roxas', 'San Teodoro', 'Socorro', 'Victoria'
  ],
  'Palawan': [
    'Puerto Princesa City',
    'Aborlan', 'Agutaya', 'Araceli', 'Balabac', 'Bataraza',
    'Brooke\'s Point', 'Busuanga', 'Cagayancillo', 'Coron', 'Culion',
    'Cuyo', 'Dumaran', 'El Nido', 'Kalayaan', 'Linapacan',
    'Magsaysay', 'Narra', 'Quezon', 'Rizal', 'Roxas',
    'San Vicente', 'Sofronio Española', 'Taytay'
  ],
  'Romblon': [
    'Romblon', 'Alcantara', 'Banton', 'Cajidiocan', 'Calatrava',
    'Concepcion', 'Corcuera', 'Ferrol', 'Looc', 'Magdiwang',
    'Odiongan', 'San Agustin', 'San Andres', 'San Fernando',
    'San Jose', 'Santa Fe', 'Santa Maria'
  ],
 
  'Albay': [
    'Legazpi City', 'Ligao City', 'Tabaco City',
    'Bacacay', 'Camalig', 'Daraga', 'Guinobatan', 'Jovellar',
    'Libon', 'Malilipot', 'Malinao', 'Manito', 'Oas',
    'Pio Duran', 'Polangui', 'Rapu-Rapu', 'Santo Domingo', 'Tiwi'
  ],
  'Camarines Norte': [
    'Daet', 'Basud', 'Capalonga', 'Jose Panganiban', 'Labo',
    'Mercedes', 'Paracale', 'San Lorenzo Ruiz', 'San Vicente',
    'Santa Elena', 'Talisay', 'Vinzons'
  ],
  'Camarines Sur': [
    'Naga City', 'Iriga City',
    'Baao', 'Balatan', 'Bato', 'Bombon', 'Buhi', 'Bula',
    'Cabusao', 'Calabanga', 'Camaligan', 'Canaman', 'Caramoan',
    'Del Gallego', 'Gainza', 'Garchitorena', 'Goa', 'Lagonoy',
    'Libmanan', 'Lupi', 'Magarao', 'Milaor', 'Minalabac',
    'Nabua', 'Ocampo', 'Pamplona', 'Pasacao', 'Pili',
    'Presentacion', 'Ragay', 'Sagñay', 'San Fernando', 'San Jose',
    'Sipocot', 'Siruma', 'Tigaon', 'Tinambac'
  ],
  'Catanduanes': [
    'Virac', 'Bagamanoc', 'Baras', 'Bato', 'Caramoran',
    'Gigmoto', 'Pandan', 'Panganiban', 'San Andres', 'San Miguel',
    'Viga', 'Virac'
  ],
  'Masbate': [
    'Masbate City',
    'Aroroy', 'Baleno', 'Balud', 'Batuan', 'Cataingan',
    'Cawayan', 'Claveria', 'Dimasalang', 'Esperanza', 'Mandaon',
    'Milagros', 'Mobo', 'Monreal', 'Palanas', 'Pio V. Corpuz',
    'Placer', 'San Fernando', 'San Jacinto', 'San Pascual', 'Uson'
  ],
  'Sorsogon': [
    'Sorsogon City',
    'Barcelona', 'Bulan', 'Bulusan', 'Casiguran', 'Castilla',
    'Donsol', 'Gubat', 'Irosin', 'Juban', 'Magallanes',
    'Matnog', 'Pilar', 'Prieto Diaz', 'Santa Magdalena'
  ],
 
  'Aklan': [
    'Kalibo', 'Altavas', 'Balete', 'Banga', 'Batan',
    'Buruanga', 'Ibajay', 'Lezo', 'Libacao', 'Madalag',
    'Makato', 'Malay', 'Malinao', 'Nabas', 'New Washington',
    'Numancia', 'Tangalan'
  ],
  'Antique': [
    'San Jose de Buenavista',
    'Anini-y', 'Barbaza', 'Belison', 'Bugasong', 'Caluya',
    'Culasi', 'Hamtic', 'Laua-an', 'Libertad', 'Pandan',
    'Patnongon', 'Sebaste', 'Sibalom', 'Tibiao', 'Tobias Fornier',
    'Valderrama'
  ],
  'Capiz': [
    'Roxas City',
    'Cuartero', 'Dao', 'Dumalag', 'Dumarao', 'Ivisan',
    'Jamindan', 'Maayon', 'Mambusao', 'Panay', 'Panitan',
    'Pilar', 'Pontevedra', 'President Roxas', 'Sapian', 'Sigma',
    'Tapaz'
  ],
  'Guimaras': [
    'Buenavista', 'Jordan', 'Nueva Valencia', 'San Lorenzo', 'Sibunag'
  ],
  'Iloilo': [
    'Iloilo City', 'Passi City',
    'Ajuy', 'Alimodian', 'Anilao', 'Badiangan', 'Balasan',
    'Banate', 'Barotac Nuevo', 'Barotac Viejo', 'Batad', 'Bingawan',
    'Cabatuan', 'Calinog', 'Carles', 'Concepcion', 'Dingle',
    'Duenas', 'Dumangas', 'Estancia', 'Guimbal', 'Igbaras',
    'Janiuay', 'Lambunao', 'Leganes', 'Lemery', 'Leon',
    'Maasin', 'Miagao', 'Mina', 'New Lucena', 'Oton',
    'Pavia', 'Pototan', 'San Dionisio', 'San Enrique', 'San Joaquin',
    'San Miguel', 'San Rafael', 'Santa Barbara', 'Sara', 'Tigbauan',
    'Tubungan', 'Zarraga'
  ],
  'Negros Occidental': [
    'Bacolod City', 'Bago City', 'Cadiz City', 'Escalante City',
    'Himamaylan City', 'Kabankalan City', 'La Carlota City',
    'Sagay City', 'San Carlos City', 'Silay City', 'Sipalay City',
    'Talisay City', 'Victorias City',
    'Binalbagan', 'Calatrava', 'Candoni', 'Cauayan', 'Enrique B. Magalona',
    'Hinigaran', 'Hinoba-an', 'Ilog', 'Isabela', 'La Castellana',
    'Manapla', 'Moises Padilla', 'Murcia', 'Pontevedra', 'Pulupandan',
    'Salvador Benedicto', 'San Enrique', 'Toboso', 'Valladolid'
  ],
 
  'Bohol': [
    'Tagbilaran City',
    'Alburquerque', 'Alicia', 'Anda', 'Antequera', 'Baclayon',
    'Balilihan', 'Batuan', 'Bien Unido', 'Bilar', 'Buenavista',
    'Calape', 'Candijay', 'Carmen', 'Catigbian', 'Clarin',
    'Corella', 'Cortes', 'Dagohoy', 'Danao', 'Dauis',
    'Dimiao', 'Duero', 'Garcia Hernandez', 'Getafe', 'Guindulman',
    'Inabanga', 'Jagna', 'Lila', 'Loay', 'Loboc',
    'Loon', 'Mabini', 'Maribojoc', 'Panglao', 'Pilar',
    'Pres. Carlos P. Garcia', 'Sagbayan', 'San Isidro', 'San Miguel',
    'Sevilla', 'Sierra Bullones', 'Sikatuna', 'Talibon', 'Trinidad',
    'Tubigon', 'Ubay', 'Valencia'
  ],
  'Cebu': [
    'Cebu City', 'Bogo City', 'Carcar City', 'Danao City', 'Lapu-Lapu City',
    'Mandaue City', 'Naga City', 'Talisay City', 'Toledo City',
    'Alcantara', 'Alcoy', 'Alegria', 'Aloguinsan', 'Argao',
    'Asturias', 'Badian', 'Balamban', 'Bantayan', 'Barili',
    'Boljoon', 'Borbon', 'Carmen', 'Catmon', 'Compostela',
    'Consolacion', 'Cordova', 'Daanbantayan', 'Dalaguete', 'Dumanjug',
    'Ginatilan', 'Liloan', 'Madridejos', 'Malabuyoc', 'Medellin',
    'Minglanilla', 'Moalboal', 'Oslob', 'Pilar', 'Pinamungajan',
    'Poro', 'Ronda', 'Samboan', 'San Fernando', 'San Francisco',
    'San Remigio', 'Santa Fe', 'Santander', 'Sibonga', 'Sogod',
    'Tabogon', 'Tabuelan', 'Tuburan', 'Tudela'
  ],
  'Negros Oriental': [
    'Dumaguete City', 'Bais City', 'Bayawan City', 'Canlaon City',
    'Guihulngan City', 'Tanjay City',
    'Amlan', 'Ayungon', 'Bacong', 'Basay', 'Bindoy',
    'Dauin', 'Jimalalud', 'La Libertad', 'Mabinay', 'Manjuyod',
    'Pamplona', 'San Jose', 'Santa Catalina', 'Siaton', 'Sibulan',
    'Tayasan', 'Valencia', 'Vallehermoso', 'Zamboanguita'
  ],
  'Siquijor': [
    'Siquijor', 'Enrique Villanueva', 'Larena', 'Lazi', 'Maria', 'San Juan'
  ],
 
  'Biliran': [
    'Naval', 'Almeria', 'Biliran', 'Cabucgayan', 'Caibiran',
    'Culaba', 'Kawayan', 'Maripipi'
  ],
  'Eastern Samar': [
    'Borongan City',
    'Arteche', 'Balangiga', 'Balangkayan', 'Can-avid', 'Dolores',
    'General MacArthur', 'Giporlos', 'Guiuan', 'Hernani', 'Jipapad',
    'Lawaan', 'Llorente', 'Maslog', 'Maydolong', 'Mercedes',
    'Oras', 'Quinapondan', 'Salcedo', 'San Julian', 'San Policarpo',
    'Sulat', 'Taft'
  ],
  'Leyte': [
    'Tacloban City', 'Baybay City', 'Ormoc City',
    'Abuyog', 'Alangalang', 'Albuera', 'Babatngon', 'Barugo',
    'Bato', 'Burauen', 'Calubian', 'Capoocan', 'Carigara',
    'Dagami', 'Dulag', 'Hilongos', 'Hindang', 'Inopacan',
    'Isabel', 'Jaro', 'Javier', 'Julita', 'Kananga',
    'La Paz', 'Leyte', 'MacArthur', 'Mahaplag', 'Matag-ob',
    'Matalom', 'Mayorga', 'Merida', 'Palo', 'Palompon',
    'Pastrana', 'San Isidro', 'San Miguel', 'Santa Fe', 'Tabango',
    'Tabontabon', 'Tanauan', 'Tolosa', 'Tunga', 'Villaba'
  ],
  'Northern Samar': [
    'Catarman', 'Allen', 'Biri', 'Bobon', 'Capul',
    'Catubig', 'Gamay', 'Laoang', 'Lapinig', 'Las Navas',
    'Lavezares', 'Mapanas', 'Mondragon', 'Palapag', 'Pambujan',
    'San Antonio', 'San Isidro', 'San Jose', 'San Roque',
    'San Vicente', 'Silvino Lobos', 'Victoria'
  ],
  'Samar': [
    'Catbalogan City', 'Calbayog City',
    'Almagro', 'Basey', 'Calbiga', 'Daram', 'Gandara',
    'Hinabangan', 'Jiabong', 'Marabut', 'Matuguinao', 'Motiong',
    'Pagsanghan', 'Paranas', 'Pinabacdao', 'San Jorge', 'San Jose de Buan',
    'San Sebastian', 'Santa Margarita', 'Santa Rita', 'Santo Niño',
    'Talalora', 'Tarangnan', 'Villareal', 'Zumarraga'
  ],
  'Southern Leyte': [
    'Maasin City',
    'Anahawan', 'Bontoc', 'Hinunangan', 'Hinundayan', 'Libagon',
    'Liloan', 'Limasawa', 'Macrohon', 'Malitbog', 'Padre Burgos',
    'Pintuyan', 'Saint Bernard', 'San Francisco', 'San Juan',
    'San Ricardo', 'Silago', 'Sogod', 'Tomas Oppus'
  ],
 
  'Zamboanga del Norte': [
    'Dipolog City', 'Dapitan City',
    'Bacungan', 'Baliguian', 'Godod', 'Gutalac', 'Jose Dalman',
    'Kalawit', 'Katipunan', 'La Libertad', 'Labason', 'Liloy',
    'Manukan', 'Mutia', 'Piñan', 'Polanco', 'Pres. Manuel A. Roxas',
    'Rizal', 'Salug', 'Sergio Osmeña Sr.', 'Siayan', 'Sibuco',
    'Sibutad', 'Sindangan', 'Siocon', 'Sirawai', 'Tampilisan'
  ],
  'Zamboanga del Sur': [
    'Pagadian City', 'Zamboanga City',
    'Aurora', 'Bayog', 'Dimataling', 'Dinas', 'Dumalinao',
    'Dumingag', 'Guipos', 'Josefina', 'Kumalarang', 'Labangan',
    'Lakewood', 'Lapuyan', 'Mahayag', 'Margosatubig', 'Midsalip',
    'Molave', 'Pitogo', 'Ramon Magsaysay', 'San Miguel', 'San Pablo',
    'Sominot', 'Tabina', 'Tambulig', 'Tigbao', 'Tukuran',
    'Vincenzo A. Sagun'
  ],
  'Zamboanga Sibugay': [
    'Ipil', 'Alicia', 'Buug', 'Diplahan', 'Imelda',
    'Kabasalan', 'Mabuhay', 'Malangas', 'Naga', 'Olutanga',
    'Payao', 'Roseller Lim', 'Siay', 'Talusan', 'Titay',
    'Tungawan'
  ],
 
  'Bukidnon': [
    'Malaybalay City', 'Valencia City',
    'Baungon', 'Cabanglasan', 'Damulog', 'Dangcagan', 'Don Carlos',
    'Impasugong', 'Kadingilan', 'Kalilangan', 'Kibawe', 'Kitaotao',
    'Lantapan', 'Libona', 'Malitbog', 'Manolo Fortich', 'Maramag',
    'Pangantucan', 'Quezon', 'San Fernando', 'Sumilao', 'Talakag'
  ],
  'Camiguin': [
    'Mambajao', 'Catarman', 'Guinsiliban', 'Mahinog', 'Sagay'
  ],
  'Lanao del Norte': [
    'Iligan City',
    'Bacolod', 'Baloi', 'Baroy', 'Kapatagan', 'Kauswagan',
    'Kolambugan', 'Lala', 'Linamon', 'Magsaysay', 'Maigo',
    'Matungao', 'Munai', 'Nunungan', 'Pantao Ragat', 'Pantar',
    'Poona Piagapo', 'Salvador', 'Sapad', 'Sultan Naga Dimaporo',
    'Tagoloan', 'Tangcal', 'Tubod'
  ],
  'Misamis Occidental': [
    'Oroquieta City', 'Ozamiz City', 'Tangub City',
    'Aloran', 'Baliangao', 'Bonifacio', 'Calamba', 'Clarin',
    'Concepcion', 'Don Victoriano Chiongbian', 'Jimenez', 'Lopez Jaena',
    'Panaon', 'Plaridel', 'Sapang Dalaga', 'Sinacaban', 'Tudela'
  ],
  'Misamis Oriental': [
    'Cagayan de Oro City', 'Gingoog City', 'El Salvador City',
    'Alubijid', 'Balingasag', 'Balingoan', 'Binuangan', 'Claveria',
    'Gitagum', 'Initao', 'Jasaan', 'Kinoguitan', 'Lagonglong',
    'Laguindingan', 'Libertad', 'Lugait', 'Magsaysay', 'Manticao',
    'Medina', 'Naawan', 'Opol', 'Salay', 'Sugbongcogon',
    'Tagoloan', 'Talisayan', 'Villanueva'
  ],
 
  'Davao de Oro': [
    'Compostela', 'Laak', 'Mabini', 'Maco', 'Maragusan',
    'Mawab', 'Monkayo', 'Montevista', 'Nabunturan', 'New Bataan',
    'Pantukan'
  ],
  'Davao del Norte': [
    'Tagum City', 'Island Garden City of Samal', 'Panabo City',
    'Asuncion', 'Braulio E. Dujali', 'Carmen', 'Kapalong', 'New Corella',
    'San Isidro', 'Santo Tomas', 'Talaingod'
  ],
  'Davao del Sur': [
    'Davao City', 'Digos City',
    'Bansalan', 'Hagonoy', 'Kiblawan', 'Magsaysay', 'Malalag',
    'Matanao', 'Padada', 'Santa Cruz', 'Sulop'
  ],
  'Davao Occidental': [
    'Malita', 'Don Marcelino', 'Jose Abad Santos', 'Santa Maria', 'Sarangani'
  ],
  'Davao Oriental': [
    'Mati City',
    'Baganga', 'Banaybanay', 'Boston', 'Caraga', 'Cateel',
    'Governor Generoso', 'Lupon', 'Manay', 'San Isidro', 'Tarragona'
  ],
 
  'Cotabato': [
    'Kidapawan City',
    'Alamada', 'Aleosan', 'Antipas', 'Arakan', 'Banisilan',
    'Carmen', 'Kabacan', 'Libungan', 'M\'lang', 'Magpet',
    'Makilala', 'Matalam', 'Midsayap', 'Pigcawayan', 'Pikit',
    'President Roxas', 'Tulunan'
  ],
  'Sarangani': [
    'Alabel', 'Glan', 'Kiamba', 'Maasim', 'Maitum',
    'Malapatan', 'Malungon'
  ],
  'South Cotabato': [
    'Koronadal City', 'General Santos City',
    'Banga', 'Lake Sebu', 'Norala', 'Polomolok', 'Santo Niño',
    'Surallah', 'Tampakan', 'Tantangan', 'Tupi'
  ],
  'Sultan Kudarat': [
    'Tacurong City',
    'Bagumbayan', 'Columbio', 'Esperanza', 'Isulan', 'Kalamansig',
    'Lambayong', 'Lebak', 'Lutayan', 'Palimbang', 'President Quirino',
    'Senator Ninoy Aquino'
  ],
 
  'Agusan del Norte': [
    'Butuan City', 'Cabadbaran City',
    'Buenavista', 'Carmen', 'Jabonga', 'Kitcharao', 'Las Nieves',
    'Magallanes', 'Nasipit', 'Remedios T. Romualdez', 'Santiago',
    'Tubay'
  ],
  'Agusan del Sur': [
    'Bayugan City',
    'Bunawan', 'Esperanza', 'La Paz', 'Loreto', 'Prosperidad',
    'Rosario', 'San Francisco', 'San Luis', 'Santa Josefa',
    'Sibagat', 'Talacogon', 'Trento', 'Veruela'
  ],
  'Dinagat Islands': [
    'San Jose', 'Basilisa', 'Cagdianao', 'Dinagat', 'Libjo',
    'Loreto', 'Tubajon'
  ],
  'Surigao del Norte': [
    'Surigao City',
    'Alegria', 'Bacuag', 'Burgos', 'Claver', 'Dapa',
    'Del Carmen', 'General Luna', 'Gigaquit', 'Mainit', 'Malimono',
    'Pilar', 'Placer', 'San Benito', 'San Francisco', 'San Isidro',
    'Santa Monica', 'Sison', 'Socorro', 'Tagana-an', 'Tubod'
  ],
  'Surigao del Sur': [
    'Tandag City', 'Bislig City',
    'Barobo', 'Bayabas', 'Cagwait', 'Cantilan', 'Carmen',
    'Carrascal', 'Cortes', 'Hinatuan', 'Lanuza', 'Lianga',
    'Lingig', 'Madrid', 'Marihatag', 'San Agustin', 'San Miguel',
    'Tagbina', 'Tago'
  ],
 
  'Abra': [
    'Bangued', 'Boliney', 'Bucay', 'Bucloc', 'Daguioman',
    'Danglas', 'Dolores', 'La Paz', 'Lacub', 'Lagangilang',
    'Lagayan', 'Langiden', 'Licuan-Baay', 'Luba', 'Malibcong',
    'Manabo', 'Penarrubia', 'Pidigan', 'Pilar', 'Sallapadan',
    'San Isidro', 'San Juan', 'San Quintin', 'Tayum', 'Tineg',
    'Tubo', 'Villaviciosa'
  ],
  'Apayao': [
    'Kabugao', 'Calanasan', 'Conner', 'Flora', 'Luna',
    'Pudtol', 'Santa Marcela'
  ],
  'Benguet': [
    'Baguio City',
    'Atok', 'Bakun', 'Bokod', 'Buguias', 'Itogon',
    'Kabayan', 'Kapangan', 'Kibungan', 'La Trinidad', 'Mankayan',
    'Sablan', 'Tuba', 'Tublay'
  ],
  'Ifugao': [
    'Lagawe', 'Aguinaldo', 'Alfonso Lista', 'Asipulo', 'Banaue',
    'Hingyon', 'Hungduan', 'Kiangan', 'Lamut', 'Mayoyao',
    'Tinoc'
  ],
  'Kalinga': [
    'Tabuk City',
    'Balbalan', 'Lubuagan', 'Pasil', 'Pinukpuk', 'Rizal',
    'Tanudan', 'Tinglayan'
  ],
  'Mountain Province': [
    'Bontoc', 'Barlig', 'Bauko', 'Besao', 'Natonin',
    'Paracelis', 'Sabangan', 'Sadanga', 'Sagada', 'Tadian'
  ],
 
  'Basilan': [
    'Isabela City', 'Lamitan City',
    'Akbar', 'Al-Barka', 'Hadji Mohammad Ajul', 'Hadji Muhtamad',
    'Lantawan', 'Maluso', 'Sumisip', 'Tabuan-Lasa', 'Tipo-Tipo',
    'Tuburan', 'Ungkaya Pukan'
  ],
  'Lanao del Sur': [
    'Marawi City',
    'Bacolod-Kalawi', 'Bayang', 'Binidayan', 'Buadiposo-Buntong',
    'Bubong', 'Butig', 'Calanogas', 'Ditsaan-Ramain', 'Ganassi',
    'Kapai', 'Kapatagan', 'Lumba-Bayabao', 'Lumbaca-Unayan', 'Lumbatan',
    'Lumbayanague', 'Madalum', 'Madamba', 'Maguing', 'Malabang',
    'Marantao', 'Marogong', 'Masiu', 'Mulondo', 'Pagayawan',
    'Piagapo', 'Picong', 'Poona Bayabao', 'Pualas', 'Saguiaran',
    'Sultan Dumalondong', 'Tagoloan II', 'Tamparan', 'Taraka',
    'Tubaran', 'Tugaya', 'Wao'
  ],
  'Maguindanao del Norte': [
    'Cotabato City', 'Barira', 'Buldon', 'Datu Blah T. Sinsuat',
    'Kabuntalan', 'Matanog', 'Northern Kabuntalan', 'Parang',
    'Sultan Kudarat', 'Sultan Mastura', 'Upi'
  ],
  'Maguindanao del Sur': [
    'Buluan', 'Ampatuan', 'Datu Abdullah Sangki', 'Datu Anggal Midtimbang',
    'Datu Hoffer Ampatuan', 'Datu Montawal', 'Datu Odin Sinsuat',
    'Datu Paglas', 'Datu Piang', 'Datu Salibo', 'Datu Saudi-Ampatuan',
    'Datu Unsay', 'General Salipada K. Pendatun', 'Guindulungan',
    'Mamasapano', 'Mangudadatu', 'Pagalungan', 'Paglat', 'Pandag',
    'Rajah Buayan', 'Shariff Aguak', 'Shariff Saydona Mustapha',
    'South Upi', 'Sultan sa Barongis', 'Talayan', 'Talitay'
  ],
  'Sulu': [
    'Jolo', 'Banguingui', 'Hadji Panglima Tahil', 'Indanan', 'Kalingalan Caluang',
    'Lugus', 'Luuk', 'Maimbung', 'Old Panamao', 'Omar',
    'Pandami', 'Panglima Estino', 'Pangutaran', 'Parang', 'Pata',
    'Patikul', 'Siasi', 'Talipao', 'Tapul', 'Tongkil'
  ],
  'Tawi-Tawi': [
    'Bongao', 'Languyan', 'Mapun', 'Panglima Sugala', 'Sapa-Sapa',
    'Sibutu', 'Simunul', 'Sitangkai', 'South Ubian', 'Tandubas',
    'Turtle Islands'
  ],
};

export const BOOKING_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'badge-pending' },
  { value: 'approved', label: 'Approved', color: 'badge-approved' },
  { value: 'rejected', label: 'Rejected', color: 'badge-rejected' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-700' },
];

export const PROPERTY_STATUSES = [
  { value: 'available', label: 'Available', color: 'badge-available' },
  { value: 'sold', label: 'Sold', color: 'badge-sold' },
  { value: 'reserved', label: 'Reserved', color: 'badge-reserved' },
  { value: 'off_market', label: 'Off Market', color: 'bg-gray-100 text-gray-700' },
];

export const INQUIRY_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'read', label: 'Read', color: 'bg-gray-100 text-gray-700' },
  { value: 'replied', label: 'Replied', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700' },
];

export const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Properties', path: '/properties' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'FiGrid' },
  { name: 'Properties', path: '/admin/properties', icon: 'FiHome' },
  { name: 'Clients', path: '/admin/clients', icon: 'FiUsers' },
  { name: 'Inquiries', path: '/admin/inquiries', icon: 'FiMessageSquare' },
  { name: 'Transactions', path: '/admin/transactions', icon: 'FiCheckSquare' },
  { name: 'Daily Activities', path: '/admin/daily-activities', icon: 'FiCamera' },
  { name: 'Hero Slides', path: '/admin/hero-slides', icon: 'FiSliders' },
  { name: 'CMS', path: '/admin/cms', icon: 'FiLayout' },
  { name: 'Testimonials', path: '/admin/testimonials', icon: 'FiStar' },
  { name: 'Settings', path: '/admin/settings', icon: 'FiSettings' },
];

export const CLIENT_NAV_LINKS = [
  { name: 'Dashboard', path: '/client/dashboard', icon: 'FiGrid' },
  { name: 'My Bookings', path: '/client/bookings', icon: 'FiCalendar' },
  { name: 'Saved Properties', path: '/client/favorites', icon: 'FiHeart' },
  { name: 'My Profile', path: '/client/profile', icon: 'FiUser' },
  { name: 'Notifications', path: '/client/notifications', icon: 'FiBell' },
];

export const PRICE_RANGES = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under ₱1 Million', min: '', max: 1000000 },
  { label: '₱1M - ₱3M', min: 1000000, max: 3000000 },
  { label: '₱3M - ₱5M', min: 3000000, max: 5000000 },
  { label: '₱5M - ₱10M', min: 5000000, max: 10000000 },
  { label: '₱10M - ₱20M', min: 10000000, max: 20000000 },
  { label: 'Over ₱20 Million', min: 20000000, max: '' },
];

export const generatePropertyCode = () => {
  const prefix = 'WGR';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

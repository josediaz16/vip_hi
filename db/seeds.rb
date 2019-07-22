# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Creating Countries...."
ISO3166::Country.countries.each do |iso_country|
  if iso_country.country_code.present?
    Country.create!(
      name:                 iso_country.name,
      code_iso:             iso_country.alpha2,
      currency:             iso_country.currency_code.to_s,
      country_code:         iso_country.country_code,
      international_prefix: iso_country.international_prefix,
      region:               iso_country.region
    )
  else
    puts "#{iso_country.name} not created because it does not have country code"
  end
end
puts "...finished creation of countries"

puts "Creating roles..."
Role.create!(name: 'celebrity')
Role.create!(name: 'admin')
Role.create!(name: 'fan')
puts "...finished creation of roles"

puts "Creating admin..."
  puts Admins::Create.(
    name: "The admin",
    country: "CO",
    email: "admin@viphi.com",
    confirmed_at: Time.now,
    password: "Adminvip_123",
    password_confirmation: "Adminvip_123"
  )
puts "...finished creation of admin"

puts "Creating Celebrities"
  puts Users::CreateCelebrity.(
    name: "Juan Esteban Aristizabal",
    country: "CO",
    handle: "@juanes",
    email: "juanes@viphi.com",
    known_as: "Juanes",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "cantante, compositor y músico colombiano de pop latino y rock en español que fusiona diversos ritmos musicales. También fue reconocido con varios Premios Grammy Latinos a lo largo de su carrera por exitosos álbumes como Mi sangre (2004).",
    photo: open("https://www.eldiestro.es/wp-content/uploads/2019/03/Juanes.jpg"),
    price: 200_000
  )

  puts Users::CreateCelebrity.(
    name: "Shakira Isabel Mebarak",
    country: "CO",
    handle: "@shakira",
    email: "shakira@viphi.com",
    known_as: "Shakira",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "cantautora, productora discográfica, bailarina, modelo, instrumentista, empresaria, actriz, embajadora de buena voluntad de la UNICEF, filántropa colombiana. Ha sido nombrada varias veces por Sony y Billboard con el sobrenombre de La Reina del Pop Latino.",
    photo: open("https://www.diariogol.com/uploads/s1/54/41/56/4/shakira-el-dorado_15_970x597.jpeg"),
    price: 100_000
  )

  puts Users::CreateCelebrity.(
    name: "Lina Tejeiro",
    country: "CO",
    email: "lina_tejeiro@viphi.com",
    handle: "@linateejeiro8",
    known_as: "Lina Tejeiro",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "es una actriz colombiana, reconocida por actuar durante cinco años en la serie televisiva Padres e hijos en el papel de Sammy.",
    photo: open("https://uploads.candelaestereo.com/1/2019/04/lina-tejeiro-puso-a-sonar-a-mas-de-uno-con-una-foto-en-pijama.jpg"),
    price: 200_000
  )

  puts Users::CreateCelebrity.(
    name: "Alejandro fernandez",
    country: "MX",
    email: "alejandrofernandez@viphi.com",
    handle: "@alejandrofernandezoficial",
    known_as: "Alejandro Fernandez",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "es un cantante mexicano de música ranchera, hijo del también cantante ranchero Vicente Fernández. En un principio se especializó en formas tradicionales de música regional mexicana1 como ranchera y mariachi. ",
    photo: open("https://mx.hola.com/imagenes/musica/2018081523584/alejandro-fernandez-disculpas-incidente-avion/0-102-67/alejandro-avion2-z.jpg"),
    price: 200_000
  )

  puts Users::CreateCelebrity.(
    name: "Lionel Messi",
    country: "AR",
    email: "leomessi@viphi.com",
    handle: "@leomessi",
    known_as: "Leo messi",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "es un futbolista argentino que juega como delantero o centrocampista. Ha desarrollado toda su carrera en el F. C. Barcelona de la Primera División de España y en la selección argentina, de la que es capitán",
    photo: open("https://cdn.cnn.com/cnnnext/dam/assets/190318100224-lionel-messi-exlarge-169.jpg"),
    price: 100_000
  )

  puts Users::CreateCelebrity.(
    name: "Andres Cepeda",
    country: "CO",
    email: "andres_cepeda@viphi.com",
    handle: "@andrescepeda",
    known_as: "Andres Cepeda",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "Productor, cantante y compositor bogotano que cuenta con una trayectoria única, que le ha permitido girar por el mundo, ser portada de múltiples revistas y diarios, participar como jurado en programas de talento, lograr primeros lugares en la radio con innumerables sencillos, figurar en listados de  plataformas digitales, ser invitado a cantar en vivo y en estudio con artistas como: Fonseca, Ricardo Montaner, Kany García, Tommy Torres, Juan Luis Guerra, Leo Dan entre otros; ser nominado y ganador de Grammy latino, compartir experiencias inigualables con fans, proponer diferentes formatos musicales como, Big Band, Sinfónico, guitarra y voz y más recientemente Cepeda en Tablas un espectáculo que mezcla el teatro con la música; todo esto ratifica a Andrés Cepeda como uno de los artistas más respetados y queridos de Colombia.",
    photo: open("http://okcundinamarca.com/wp-content/uploads/2018/03/Este-fue-el-lugar-elegido-para-grabar-el-nuevo-video-de-Andr%C3%A9s-Cepeda-750x445.jpg"),
    price: 100_000
  )

  puts Users::CreateCelebrity.(
    name: "Carla Giraldo",
    country: "CO",
    email: "carlagiraldo@viphi.com",
    handle: "@carlagiraldo",
    known_as: "Carla Giraldo",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "Actriz y empresaria colombiana. Famosa por producciones como las muñecas de la mafia /falsa identidad /loquito por ti/ LA RUTA BLANCA / Nora / cumbia Ninja / los graduados / la traicionera  / me llaman Lolita /",
    photo: open("https://cr00.epimg.net/radio/imagenes/2018/12/12/entretenimiento/1544641286_084661_1544641416_noticia_normal.jpg"),
    price: 100_000
  )

  puts Users::CreateCelebrity.(
    name: "Enrique Ernesto Wolff Dos Santos",
    country: "AR",
    email: "quiquewolff@viphi.com",
    handle: "@wolffquique",
    known_as: "Quique Wolff",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "Jugador de fútbol. Ahora periodista de ESPN",
    photo: open("http://pre.futbolred.com/files/article_main/uploads/2018/02/09/5a7d902c11367.jpeg"),
    price: 200_000
  )

  puts Users::CreateCelebrity.(
    name: "Carmen Villalobos",
    country: "CO",
    email: "carmenvillalobos@viphi.com",
    handle: "@cvillaloboss",
    known_as: "Carmen Villalobos",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "Carmen Villalobos es una modelo y actriz colombiana. Mejor conocida por sus papeles en muchos programas de televisión, incluyendo \"Amores de Mercado\", \"Sin senos no hay paraíso\" y \"La Tormenta\".",
    photo: open("https://media.metrolatam.com/2018/02/01/capturadepantalla20180201alas131219-3a6b200abe310a45e50b3627c7d915e1-1200x600.jpg"),
    price: 200_000
  )

  puts Users::CreateCelebrity.(
    name: "Sebastian Caicedo",
    country: "CO",
    email: "sebastiancaicedo@viphi.com",
    handle: "@sebastiancaicedo",
    known_as: "Sebastian Caicedo",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "Actor colombiano. Ha participado en varias telenovelas donde ha tenido que compartir el set con su novia Carmen Villalobos, al igual que en producciones como El señor de los cielos.",
    photo: open("https://cdn6.sindyk.com/?src=https://i1.wp.com/elnuevodiario.com.do/wp-content/uploads/2019/01/WhatsApp-Image-2019-01-16-at-8.27.21-AM-1024x550.jpeg&w=640&q=80"),
    price: 100_000
  )

Celebrity.reindex
puts "...finished creation of celebrities"

puts "Creating fans"
  puts Users::CreateFan.(
    name: "Juanito Alimaña",
    country: "CO",
    email: "juanitoalimana@viphi.com",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
  )
puts "...finished creation of fans"

puts "Creating message requests"
  puts  MessageRequests::Create.(
    phone_to: '320 123 4567',
    to: 'Pepito perez',
    from: 'Juanito Alimaña',
    celebrity_id: Celebrity.last.id,
    fan_id: Fan.last.id,
    brief: "Tell the guy happy birthday",
    recipient_type: 'someone_else'
  )
puts "...finished creation of MRs"

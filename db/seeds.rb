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
    email: "juanes@viphi.com",
    known_as: "Juanes",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "cantante, compositor y músico colombiano de pop latino y rock en español que fusiona diversos ritmos musicales. También fue reconocido con varios Premios Grammy Latinos a lo largo de su carrera por exitosos álbumes como Mi sangre (2004).",
    photo: open("https://www.eldiestro.es/wp-content/uploads/2019/03/Juanes.jpg"),
    price: 10
  )

  puts Users::CreateCelebrity.(
    name: "Shakira Isabel Mebarak",
    country: "CO",
    email: "shakira@viphi.com",
    known_as: "Shakira",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "cantautora, productora discográfica, bailarina, modelo, instrumentista, empresaria, actriz, embajadora de buena voluntad de la UNICEF, filántropa colombiana. Ha sido nombrada varias veces por Sony y Billboard con el sobrenombre de La Reina del Pop Latino.",
    photo: open("https://www.diariogol.com/uploads/s1/54/41/56/4/shakira-el-dorado_15_970x597.jpeg"),
    price: 15
  )

  puts Users::CreateCelebrity.(
    name: "Lina Tejeiro",
    country: "CO",
    email: "lina_tejeiro@viphi.com",
    known_as: "Lina Tejeiro",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "es una actriz colombiana, reconocida por actuar durante cinco años en la serie televisiva Padres e hijos en el papel de Sammy.",
    photo: open("https://files.rcnradio.com/public/styles/image_834x569/public/2018-09/linatejeiro6_1_0.jpg?itok=HaoihlUT"),
    price: 5
  )

  puts Users::CreateCelebrity.(
    name: "Alejandro fernandez",
    country: "MX",
    email: "alejandrofernandez@viphi.com",
    known_as: "Alejandro Fernandez",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "es un cantante mexicano de música ranchera, hijo del también cantante ranchero Vicente Fernández. En un principio se especializó en formas tradicionales de música regional mexicana1 como ranchera y mariachi. ",
    photo: open("https://mx.hola.com/imagenes/musica/2018081523584/alejandro-fernandez-disculpas-incidente-avion/0-102-67/alejandro-avion2-z.jpg"),
    price: 8
  )

  puts Users::CreateCelebrity.(
    name: "Lionel Messi",
    country: "AR",
    email: "leomessi@viphi.com",
    known_as: "Leo messi",
    confirmed_at: Time.now,
    password: "default_pass_123",
    password_confirmation: "default_pass_123",
    biography: "es un futbolista argentino que juega como delantero o centrocampista. Ha desarrollado toda su carrera en el F. C. Barcelona de la Primera División de España y en la selección argentina, de la que es capitán",
    photo: open("http://as01.epimg.net/tikitakas/imagenes/2019/03/19/portada/1553032122_246043_1553032954_noticia_normal.jpg"),
    price: 25
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
    email_to: 'pepito@mail.com',
    to: 'Pepito perez',
    celebrity_id: Celebrity.last.id,
    fan_id: Fan.last.id,
    brief: "Tell the guy happy birthday"
  )
puts "...finished creation of MRs"

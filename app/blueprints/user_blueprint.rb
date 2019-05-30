class UserBlueprint < Blueprinter::Base
  identifier :id
  fields :email, :name, :known_as

  field :photo do |object|
    Common::UploadUtils.get_attachment_url(object.photo)
  end

  view :normal do
    association :country, blueprint: CountryBlueprint
  end

  view :celebrity do
    include_view :normal
    association :celebrity, blueprint: CelebrityBlueprint
  end
end

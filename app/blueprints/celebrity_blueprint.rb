class CelebrityBlueprint < Blueprinter::Base
  identifier :id
  fields :biography, :price, :handle

  view :normal do
    association :user, blueprint: UserBlueprint, view: :normal
  end
end

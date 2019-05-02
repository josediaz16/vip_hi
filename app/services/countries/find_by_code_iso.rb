module Countries
  M = Dry::Monads

  FindByCodeIso = -> code_iso do
    country = Country.find_by(code_iso: code_iso)

    M.Maybe(country)
      .bind { |value| M.Maybe(value.id) }
      .value_or(nil)
  end
end

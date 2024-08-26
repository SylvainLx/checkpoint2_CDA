import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country";

@InputType()
class CountryInput implements Partial<Country> {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field()
  continent_code: string;
}

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getAllCountry(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code") code: string): Promise<Country> {
    return await Country.findOneByOrFail({ code: code });
  }

  @Query(() => [Country], { nullable: true })
  async getCountryByContinent(
    @Arg("continent_code") continent_code: string
  ): Promise<Country[] | null> {
    return await Country.find({ where: { continent_code: continent_code } });
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data") newCountry: CountryInput
  ): Promise<CountryInput> {
    const country = await Country.create({
      code: newCountry.code,
      name: newCountry.name,
      emoji: newCountry.emoji,
      continent_code: newCountry.continent_code,
    }).save();
    return country;
  }
}

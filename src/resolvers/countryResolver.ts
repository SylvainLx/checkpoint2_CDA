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
}

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getAllCountry(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return await Country.findOneBy({ code: code });
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data") newCountry: CountryInput
  ): Promise<CountryInput> {
    const country = await Country.create({
      code: newCountry.code,
      name: newCountry.name,
      emoji: newCountry.emoji,
    }).save();
    return country;
  }
}

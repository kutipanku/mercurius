import { Resolver, Mutation, Arg } from 'type-graphql';
import { Language } from '@/entity/Language';
import { UpdateLanguageInput } from '@/modules/language/input';

@Resolver(Language)
export class UpdateLanguageResolver {
  /* ------------------------------------
  => Edit language based on Id
  ------------------------------------ */
  @Mutation(() => Language)
  async updateLanguage(
    @Arg('data')
    { id, name }: UpdateLanguageInput
  ): Promise<Language | null> {
    const language = await Language.findOne({ where: { id } });
    if (!language) {
      return null;
    } else {
      language.name = name;
      await language.save();
    }

    return language;
  }
}

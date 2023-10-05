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
    { id, contentID, contentEN, code }: UpdateLanguageInput
  ): Promise<Language | null> {
    const language = await Language.findOne({ where: { id } });
    if (!language) {
      return null;
    } else {
      if (contentID) {
        language.contentID = contentID;
      }
      if (contentEN) {
        language.contentEN = contentEN;
      }
      if (code) {
        language.code = code;
      }
      await language.save();
    }

    return language;
  }
}

import { Resolver, Query, Arg } from 'type-graphql';
import { Language } from '../../entity/Language';

@Resolver(Language)
export class ReadLanguageResolver {
  /* ------------------------------------
  => Get language by id
  ------------------------------------ */
  @Query(() => Language, { nullable: true })
  async language(@Arg('id') id: string): Promise<Language | null> {
    const language = await Language.findOne({ where: { id } });
    if (!language) {
      return null;
    }
    return language;
  }

  /* ------------------------------------
  => Get all languages
  ------------------------------------ */
  @Query(() => [Language])
  async allLanguage(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<Language[] | null> {
    let languages = [];
    if (rowPerPage === 0) {
      languages = await Language.find();
    } else {
      languages = await Language.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage
      });
    }
    if (!languages) {
      return null;
    }
    return languages;
  }
}

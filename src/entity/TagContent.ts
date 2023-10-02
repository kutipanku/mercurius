import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Language, Tag } from '@/entity';

@ObjectType('TagContentEntity')
@Entity('tag_content')
export class TagContent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ name: 'tag' })
  tagId!: string;

  @Field(() => Tag)
  @ManyToOne(() => Tag, (tag: Tag) => tag.id)
  @JoinColumn({ name: 'tag', referencedColumnName: 'id' })
  tag!: Tag;

  @Field()
  @Column({ name: 'language' })
  languageId: number;

  @Field(() => Language, { nullable: true })
  @ManyToOne(() => Language, (language: Language) => language.id, {
    eager: true
  })
  @JoinColumn({ name: 'language', referencedColumnName: 'id' })
  language: Language;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn({
    default: () => null,
    nullable: true
  })
  updateDate?: Date;

  @DeleteDateColumn()
  deleteDate?: Date;
}

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'users' })
export class UsersEntity {
    // 主键装饰器
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column('varchar')
  password: string;

  // @Column()
  // status: boolean;

  @OneToMany(
    () => ArticleEntity,
    article => article.user,
  )
  articles: [];
}

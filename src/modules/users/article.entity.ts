import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { UsersEntity } from './users.entity';
// import { PhotoEntity } from '../photo/photo.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  // 主键装饰器
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column('text')
  content: string

  @Column()
  star: string

  @Column()
  like: string

  @Column()
  message: string

  @ManyToOne(
    () => UsersEntity,
    user => user.articles,
  )
  user: UsersEntity;

  //   @OneToMany(
  //     () => PhotoEntity,
  //     photo => photo.user,
  //   )
  //  photos: [];
}

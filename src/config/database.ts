import {join} from 'path'
export default {
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'sql_blog',
    entities: [join(__dirname,'../','**/**.entity{.ts,.js}')],
    // 实体 映射关系
    synchronize: true
}
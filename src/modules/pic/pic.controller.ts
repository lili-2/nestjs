import { Body, Controller, Post ,Request} from '@nestjs/common';

var parseString = require('xml2js').parseString

@Controller('pic')
export class PicController {
    constructor(){}

    @Post()
    async savePic(@Request() req){
        req.on('data',reqs => {
            parseString(reqs, function(err,result)  {
             console.log(result);
             console.log(err)
            })
        })
        return 'heelo'
    }
}

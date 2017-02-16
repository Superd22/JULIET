import { Pipe, PipeTransform } from '@angular/core';
declare function unescape(s:string): string;

@Pipe({
  name: 'urlize'
})

export class UrlizePipe implements PipeTransform {

  transform(url:string):string {
    // make the url lowercase        
    var encodedUrl = unescape(url.toLowerCase()); 

    // replace é ê è with e
    encodedUrl = encodedUrl.split(/[éêëè]/).join("e");
    
    // replace â â à with a
    encodedUrl = encodedUrl.split(/[ââà]/).join("a");

    // replace u with u
    encodedUrl = encodedUrl.split(/[ùüû]/).join("u");

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&[a-z]+;/).join("-")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // Remove first and last
    encodedUrl = encodedUrl.split(/^-?/).join("");
    encodedUrl = encodedUrl.split(/-?$/).join("");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim(); 

    return encodedUrl; 
  }

}

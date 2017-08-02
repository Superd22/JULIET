import { environment } from './../../../../environments/environment';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public motr: string;
  private words = [
    "🎶 tu sera biiiiienvenue chez nouuus 🎶",
    "🎶 Give it up, baby give it up 🎶",
    "😍 Qui est la plus belle ?",
    "Web fulcrum 3.0",
    "ton assitante personelle",
    "à ton service.",
    "SUIVAAAAAAAAANT.",
    "Autodestruction dans 3...2...1....",
    "Repete après moi : LES G.O SONT MES AMIS",
    "100% Sans gluten",
    "Codé avec les pieds",
    "Sibylla, ou ça ?",
    "Est-ce que vous êtes chaud ce soir ?",
    "La légende des années soixante, septante et quatre-vingt !",
    "Cuir de qualitay.",
    "Toi aussi, deviens un héro.",
    "Un service de qualité",
    "Sans S.A.V",
    "LE PROPRIETAIRE DU HORNET FUSHIA EN DOUBLE FILE EST PRIE DE SE FAIRE CONNAITRE",
    "Il est 3h du mat, Super d en est au 20éme message à la con.",
    "if(user == kable) then die();",
    "Du coup ça bug toujours ?",
    "Si seulement quelqu'un pouvais m'aimer 😢",
  ]

  constructor(private http: Http) {

  }

  ngOnInit() {
    var n = Math.floor(Math.random() * (this.words.length));

    this.motr = this.words[n];

  }

}

import { UserComponent } from '../components/user.component';
export let user = {
    main: {
        name: "secure.user",
        url:"User/:user_id",
        views:{"content":{component:UserComponent}},
        params: {
            user_id:null,
        }
    }
}
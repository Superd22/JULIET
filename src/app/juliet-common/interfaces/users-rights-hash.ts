import { ReplaySubject } from 'rxjs/ReplaySubject';
import { JulietRightsService } from './../services/juliet-rights.service';
/**
 * Helper class to store all the computed rights 
 */
export class UsersRightsHash {

    private _map: Map<string, Map<number, Map<number, ReplaySubject<boolean>>>> = new Map();
    private user_id: number = 0;

    public constructor() {

    }

    /**
     * Get a right from the cache
     * @param right_name the name of the right
     * @param user_id the user id for this right
     * @param target_id the target
     * @param get_last_map wheter to return the deepest map or the right itself.
     */
    public get(right_name: string, user_id?: number, target_id?: number, get_last_map?: boolean): any {
        user_id = this.handle_user_id(user_id);
        target_id = this.handle_target_id(target_id);

        let r: Map<any, any> = this._map.get(right_name);
        if (r) {
            r = r.get(user_id);
            if (get_last_map) return r;
            if (r) {
                let ret: ReplaySubject<boolean> = r.get(target_id);
                return ret;
            }
        }
        return null;
    }

    public enforce_get_last_map(right_name: string, user_id?: number, target_id?: number) {
        if (!this.has(right_name, user_id, target_id)) this.set(right_name, null, user_id, target_id);
        return this.get(right_name, user_id, target_id, true);
    }

    /**
     * Checks if this right has been fetched before
     * @param right_name the name of the right
     * @param user_id the user id for this right
     * @param target_id the target
     */
    public has(right_name: string, user_id?: number, target_id?: number): boolean {
        return this.get(right_name, user_id, target_id) == null ? false : true;
    }

    /**
     * Set a right in the cache
     * @param right_name the name of the right
     * @param user_id the user id for this right
     * @param target_id the target
     * @param right the value of the right
     */
    public set(right_name: string, right: boolean, user_id?: number, target_id?: number) {
        user_id = this.handle_user_id(user_id);
        target_id = this.handle_target_id(target_id);

        this.ensureExists(right_name, user_id, target_id);
        if (!this.has(right_name, user_id, target_id))
            this._map.get(right_name).get(user_id).set(target_id, new ReplaySubject<boolean>(1));

        this._map.get(right_name).get(user_id).get(target_id).next(right);
    }

    /**
     * Converts user_id 
     * @param user_id 
     */
    private handle_user_id(user_id: number) {
        if (user_id == null || user_id == 0) return this.user_id;
        else return user_id;
    }

    /**
     * Ensures that all the map exists for these values
     * @param right_name the name of the right
     * @param user_id the user id for this right
     * @param target_id the target
     */
    private ensureExists(right_name: string, user_id?: number, target_id?: number) {
        if (!this._map.has(right_name))
            this._map.set(right_name, new Map<number, Map<number, ReplaySubject<boolean>>>());

        if (!this._map.get(right_name).has(user_id))
            this._map.get(right_name).set(user_id, new Map<number, ReplaySubject<boolean>>());
    }

    private handle_target_id(target_id: number) {
        if (target_id == null) return 0;
        else return target_id;
    }

    public set_user_id(user_id: number) {
        this.user_id = user_id;
    }

}
import {action, makeObservable, observable, runInAction} from "mobx";
import {CountryInfo, getCountryByName} from "../api/apiService";

class AutoCompleteVM {

    constructor(maxTipsCount: number) {
        makeObservable(this);
        this.maxTipsCount = maxTipsCount;
    }

    /** Текст поиска стран */
    @observable public searchText: string = ''
    /** Массив стран */
    @observable public countries: CountryInfo[] = [];
    /** Максимальное количество подсказок */
    @observable public maxTipsCount: number;

    /** сеттер для текста поиска... */
    @action.bound
    async onSearchTextChange(value: string) {
        this.searchText = value;
        await this.getCountries(value);
    }

    /** Обработка нажатия на подсказку */
    @action.bound
    onTipClick(value: string) {
        this.searchText = value;
        this.countries = [];
    }

    /** Получение массива стран */
    @action
    async getCountries(value: string) {
        try {
            const countries = await getCountryByName(value);
            runInAction(() => {this.countries = countries.slice(0, this.maxTipsCount)});
        } catch (e) {
            console.log(e);
        }
    }
}

export default AutoCompleteVM
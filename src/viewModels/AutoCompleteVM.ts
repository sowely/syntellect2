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
    /** Признак загрузки */
    @observable public isLoading: boolean = false;
    /** Id установленного таймаута для предотвращения лишних запросов */
    @observable public timeoutId?: ReturnType<typeof setTimeout>;
    /** Время задержки для предотвращения лишних запросов */
    @observable public timeout: number = 500;

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
        this.setCountries([]);
    }

    /** Изменение массива стран */
    @action
    setCountries(arr: CountryInfo[]) {
        this.countries = arr;
    }

    /** Получение массива стран */
    @action
    async getCountries(value: string) {
        this.isLoading = true;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(async () => {
            if (this.searchText) {
                try {
                    const countries = await getCountryByName(value);
                    runInAction(() => {
                        this.setCountries(countries.slice(0, this.maxTipsCount));
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                this.setCountries([]);
            }
            runInAction(() => this.isLoading = false)
        }, this.timeout)
    }
}

export default AutoCompleteVM

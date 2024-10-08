import {ChangeEvent, FormEvent, useMemo, useState} from "react";
import {useBudget} from "../hooks/useBudget.ts";

function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const {dispatch} = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: "add-budget", payload: {budget}});
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget"
                       className="text-4xl text-blue-600 font-bold text-center">
                    Definir presupuesto
                </label>
                <input
                    id="budget"
                    name="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    value={budget}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Definir presupuesto"
                    className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer p-2
                    text-white font-black uppercase disabled:opacity-40"
                    disabled={isValid}

                />
            </div>
        </form>
    );
}

export default BudgetForm;
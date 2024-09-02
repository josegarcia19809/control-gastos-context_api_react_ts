import {categories} from "../data/categories.ts";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {DraftExpense, Value} from "../types";
import ErrorMessage from "./ErrorMessage.tsx";
import {useBudget} from "../hooks/useBudget.ts";

function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date()
    });

    const [error, setError] = useState("");

    const {dispatch} = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement> |
        ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son obligatorios")
            return;
        }
        // Agregar un nuevo gasto
        dispatch({type: "add-expense", payload: {expense}});
        setError("")
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4
                                border-blue-500 py-2">
                Nuevo gasto
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl">
                    Nombre gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    className="bg-slate-100 p-2"
                    placeholder="Añade el nombre del gasto"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl">
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="bg-slate-100 p-2"
                    placeholder="Añade la cantidad del gasto"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl">
                    Categoria:
                </label>
                <select
                    id="category"
                    name="category"
                    className="bg-slate-100 p-2"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl">
                    Fecha gasto:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>


            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
                        font-bold rounded-lg"
                value="Registrar gasto"
            />

        </form>
    );
}

export default ExpenseForm;
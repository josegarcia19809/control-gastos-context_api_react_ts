import {categories} from "../data/categories.ts";

function ExpenseForm() {
    return (
        <form className="space-y-5">
            <legend className="uppercase text-center text-2xl font-black border-b-4
                                border-blue-500 py-2">
                Nuevo gasto
            </legend>

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
                >
                    <option value="">--Seleccione--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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
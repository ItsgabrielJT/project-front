
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { ordersGrid } from '../data/dummy';
import { Header } from '../components';

const data = [
  {
    id: 1,
    codigo: "APX9037",
    descripcion: "SOLUCION DE CONFIGURACION",
    tecnico: "Tcnico 1",
    cliente: "Cliente 1",
  },
  {
    id: 2,
    codigo: "JCVDX90",
    descripcion: "SOLUCION DE CONFIGURACION2 ",
    tecnico: "Tcnico 1",
    cliente: "Cliente 2",
  },
]

export default function Reservas() {
  const [products, setProducts] = useState(null);
  const [statuses] = useState(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);
  const editing = { allowDeleting: true, allowEditing: true };

  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    setProducts(ordersGrid)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSeverity = (value) => {
    switch (value) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    setProducts(_products);
  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData.inventoryStatus)}></Tag>;
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
  };

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    ciudad: "",
    cedula: "",
    telefono: "",
    genero: "",
    email: "",
  })


  const handleSubmit = () => {
    let obj = data
    obj.push(form)
    setProducts(obj)
    setIsOpen(!isOpen);
  }

  const handleEvent = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

      {
        isOpen && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">

            <form onSubmit={handleSubmit}>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                    Descripcion
                  </label>
                  <input name="descripcion" onChange={handleEvent} value={form.descripcion} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Some Solution" />
                  <p className="text-red text-xs italic">Please fill out this field.</p>
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    Tecnico
                  </label>
                  <input name="tecnico" onChange={handleEvent} value={form.tecnico} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe" />
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Cliente
                  </label>
                  <input name="cliente" onChange={handleEvent} value={form.cliente} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" />
                </div>
              </div>

              <div className="flex space-x-4  mt-10 ">
                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#B9EC52]/50"
                >
                  Guardar
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#F05D40]/50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

        )
      }

      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-3 ...">
          <Header category="Page" title="Tickets" />
        </div>
        <div class="col-end-9 col-span-2 ...">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
          >
            +
          </button>
        </div>
      </div>

      <div className="card p-fluid">
        <DataTable value={data} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="ID" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="codigo" header="CODIGO" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="descripcion" header="DESCRIPCION" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="tecnico" header="TECNICO"  editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="cliente" header="CLIENTE"  editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
      </div>

    </div>


  );
}

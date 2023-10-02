
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const data = [
  {
    id: 1,
    nombre: "Marco Urutia",
    apellido: "Marco Urutia",
    ciudad: "Quito",
    telefono: "0987814188",
    cedula: "17227879176",
    genero: "Masculino",
    email: "marco@gmail.com",
  },
  {
    id: 2,
    apellido:"Marquez",
    nombre: "Fernanda Marquez",
    ciudad: "Quito",
    cedula: "17227870000",
    telefono: "0987901988",
    genero: "Femenino",
    email: "fernanda@gmail.com",
  }
]

export const Conferencistas = () => {
  const [products, setProducts] = useState(data);
  const [statuses] = useState(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);

  const [isOpen, setIsOpen] = useState(false)
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

  const getData = async () => {
    try {
      const url = `https://05hgr7cf-1337.use.devtunnels.ms/api/clientes`
      const respuesta = await axios.get(url)
      setProducts(respuesta.data)
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(async () => {
    getData();
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
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    Nombres
                  </label>
                  <input name="nombre" onChange={handleEvent} value={form.nombre} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"  type="text" placeholder="Jane" />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    Cedula
                  </label>
                  <input name="cedula" onChange={handleEvent} value={form.cedula} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" placeholder="Doe" />
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    Email
                  </label>
                  <input name="email" onChange={handleEvent} value={form.email} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"  type="email" placeholder="@example.com" />
                </div>
              </div>
              <div className="-mx-3 md:flex mb-2">

                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                      Ciudad
                    </label>
                    <input name="ciudad" onChange={handleEvent} value={form.ciudad} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" placeholder="Albuquerque" />
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                      Genero
                    </label>
                    <input name="genero" onChange={handleEvent} value={form.genero} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" placeholder="Albuquerque" />
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                      Telefono
                    </label>
                    <input name="telefono" onChange={handleEvent} value={form.telefono} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"  type="text" placeholder="Albuquerque" />
                  </div>

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

      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-end-3 ...">
          <Header category="Page" title="Clientes" />
        </div>
        <div className="col-end-9 col-span-2 ...">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
          >
            +
          </button>
        </div>
      </div>

      <div className="card p-fluid">
        <DataTable value={products} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="ID" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="nombre" header="NOMBRES" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="cedula" header="CEDULA" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="email" header="EMAIL" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="telefono" header="TELEFONO" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
      </div>

    </div>


  );
}
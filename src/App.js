import React, { useState, useEffect } from 'react';
import './App.css';
import AddEmployeeButton from './components/AddEmployeeButton';
import styled from 'styled-components'
import { useTable, useSortBy, usePagination } from 'react-table'



const mockData = [
  {
    firstName: "Ashish",
    userName: "bloopblaap",
    age: 24,
    phone: 9731739703,
    gender: "Male",
    email: "ashraods@gmail.com"

  },
  {
    firstName: "Tanaya",
    userName: "discopotato",
    age: 22,
    phone: 9539854416,
    gender: "Female",
    email: "hakoonamatata@gmail.com"

  },
]





const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      // height:500px;

      :last-child {
        border-right: 0;
      }
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        background-color:rgb(182, 212, 13);
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, 
}) => {
  
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  
  const onBlur = () => {
    updateMyData(index, id, value)
  }

 
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}


const defaultColumn = {
  Cell: EditableCell,
}



function Table({ columns, data, updateMyData, skipPageReset }) {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    defaultColumn,
   
    autoResetPage: !skipPageReset,
    
    updateMyData,
    initialState: { pageIndex: 0 }
  },
    useSortBy, usePagination)


  
  return (
    <>
     
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>

              {headerGroup.headers.map(column => (

                column.Header !== "Personal Info"  || column.Header !== "Age"   || column.Header !== "Gender" ? <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>

                </th> : ""


              ))}

             
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (

              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  cell.column.Header !== "Gender" 
                  
                  ? <td {...cell.getCellProps()}>{cell.render('Cell')}</td> : ""
                ))}


                {row.cells.map(cell => (
                  cell.column.Header === "Gender" ? <td {...cell.getCellProps()}><select class="form-select" aria-label="Default select example">
                    <option selected>{cell.value}</option>
                    <option value="1">{cell.value === "Male" ? "Female" : "Male"}</option>
                    <option value="2">{cell.value === "Other" ? "Female" : "Other"}</option>
                   
                  </select></td> : ""
                ))}
                
              </tr>


            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}




function App() {



  const columns = React.useMemo(
    () => [
      {
        Header: 'Name Details',
        columns: [
          {
            Header: 'Name',
            accessor: 'firstName',
          },
          {
            Header: 'User-Name',
            accessor: 'userName',
          },
        ],
      },
      {
        Header: 'Contact Info',
        columns: [

          {
            Header: 'Phone',
            accessor: 'phone',
          },

          {
            Header: 'e-mail',
            accessor: 'email',
          },
        ],
      },
      {
        Header: 'Personal Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
        ],
      },
      
    ],
    []
  )



  const [data, setData] = React.useState(mockData)
  const [addDataState, setAddDataState] = useState({
    firstName: "",
    userName: "",
    phone: "",
    email: "",
    age: "",
    gender: ""
  })



  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
   
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  
  return (
    <div className="body">
      <h1>Employee Details</h1>

      <div className="table">
        <Styles>

          <Table columns={columns}
            data={data}
            updateMyData={updateMyData}
          
          />
        </Styles>
      </div>
      <AddEmployeeButton setData={setData} data={data} addDataState={addDataState} setAddDataState={setAddDataState} />
    </div>
  );
}

export default App;

using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;

namespace ThirdPartyAPILibrary.Helper
{
    public class APIClientDapperContext
    {
        private readonly string _connectionString;

        private readonly IDbConnection _connection;

        public APIClientDapperContext(string connectionString)
        {
            _connectionString = connectionString;
            _connection = CreateConnection();
        }

        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);

        /// <summary>
        /// Get List from Query 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public async Task<List<T>> GetList<T>(string query, string LogFilePath, object? parameters = null, CommandType commandType = CommandType.Text)
            where T : class
        {
            try
            {
                Console.WriteLine("GetList Connection: " + _connection.ConnectionString);
                Console.WriteLine("GetList Connection Condition Check: " + _connection.State + ConnectionState.Closed);
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                    Console.WriteLine("GetList Connection Open.");
                }
                //await Log.WriteLog(LogFilePath, "GetList Connection: " + _connection.ConnectionString);
                return (await _connection.QueryAsync<T>(query, parameters, commandType: commandType).ConfigureAwait(true)).AsList();
            }
            catch (Exception ex)
            {
                //await Log.WriteLog(LogFilePath, "GetList Exception: " + ex);
                Console.WriteLine("GetList Exception: " + ex);
                throw ex;
            }
            finally
            {
                Console.WriteLine("GetList Finally Exception");
                //_connection.Close();
            }

        }

        /// <summary>
        /// Get List from Query 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public async Task<List<T>> GetList<T>(string query, object? parameters = null, CommandType commandType = CommandType.Text)
            where T : class
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }
                return (await _connection.QueryAsync<T>(query, parameters, commandType: commandType).ConfigureAwait(true)).AsList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //_connection.Close();
            }

        }

        public async Task<T> GetFrist<T>(string query, object? parameters = null, CommandType commandType = CommandType.Text)
          where T : class
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }
                return await _connection.QueryFirstOrDefaultAsync<T>(query, parameters, commandType: commandType);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                // _connection.Close();
            }
        }


        public async Task GetListParameterSP(string query, List<SqlParameter> parameters, CommandType commandType = CommandType.Text)
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }

                // Convert the list of SqlParameters to a dynamic object
                var dynamicParams = new DynamicParameters();
                foreach (var param in parameters)
                {
                    dynamicParams.Add(param.ParameterName, param.Value, param.DbType, param.Direction, param.Size);
                }

                // Execute the query with the parameters
                await _connection.ExecuteAsync(query, dynamicParams, commandType: commandType).ConfigureAwait(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //_connection.Close();
            }
        }

        /// <summary>
        /// Get List from Query 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public async Task<T> GetSingleAsync<T>(string query, object? parameters = null, CommandType commandType = CommandType.Text)
            where T : class
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }
                return await _connection.QuerySingleOrDefaultAsync<T>(query, parameters, commandType: commandType);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                // _connection.Close();
            }
        }

        public async Task<T> GetScaler<T>(string query, object? parameters = null, CommandType commandType = CommandType.Text)
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }
                return await _connection.ExecuteScalarAsync<T>(query, parameters, commandType: commandType);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                //_connection.Close();
            }
        }

        /// <summary>
        /// Get List from Query 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public async Task Execute(string query, object? parameters = null, CommandType commandType = CommandType.Text)
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }
                await _connection.ExecuteAsync(query, parameters, commandType: commandType);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                //_connection.Close();
            }
        }

        public async Task<DataTable> GetDataAsDataTableAsync(string query, object param = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Execute the query and retrieve the result
                var result = await connection.QueryAsync<dynamic>(query, param);

                // Convert the result into a DataTable
                DataTable dataTable = new();
                if (result.Any())
                {
                    // Create columns based on the properties of the first object in the result
                    var properties = ((IDictionary<string, object>)result.First()).Keys.ToList();
                    foreach (var property in properties)
                    {
                        dataTable.Columns.Add(property);
                    }

                    // Fill the DataTable with data
                    foreach (var item in result)
                    {
                        DataRow row = dataTable.NewRow();
                        var dictionary = (IDictionary<string, object>)item;
                        foreach (var property in properties)
                        {
                            row[property] = dictionary[property];
                        }
                        dataTable.Rows.Add(row);
                    }
                }

                return dataTable;
            }
        }
    }
}

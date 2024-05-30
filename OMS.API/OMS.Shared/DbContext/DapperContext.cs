using Dapper;
using Microsoft.Data.SqlClient;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Shared.DbContext
{
    public class DapperContext
    {
        private readonly string _connectionString;

        private readonly IDbConnection _connection;
        public DapperContext(string connectionString)
        {
            _connectionString = connectionString;
            _connection = CreateConnection();
        }
        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);


        #region"Store procedure "

        /// <summary>
        /// following sp only use if we have pagination with total count 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="parameters"></param>
        /// <param name="hasTotalCount"></param>
        /// <returns></returns>
        public async Task<EntityList<T>> GetListSP<T>(string query, object? parameters = null, bool hasTotalCount = false)
            where T : class
        {
            try
            {
                if (_connection.State == ConnectionState.Closed)
                {
                    _connection.Open();
                }

                var dynamicParameters = new DynamicParameters(parameters);
                if (hasTotalCount)
                {
                    dynamicParameters.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);
                }
                var result = (await _connection.QueryAsync<T>(query, dynamicParameters, commandType: CommandType.StoredProcedure).ConfigureAwait(true)).AsList();
                EntityList<T> objResult = new();
                objResult.DataSource = result;
                if (hasTotalCount)
                {
                    objResult.TotalRecord = dynamicParameters.Get<int>("TotalCount");
                }
                return objResult;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                //// _connection.Close();
            }

        }

        #endregion

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
                // _connection.Close();
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
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                // _connection.Close();
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
            catch (Exception ex)
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
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                // _connection.Close();
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
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                // _connection.Close();
            }
        }
    }
}

using AutoMapper;

namespace Common.Helper.Extension
{
    public static class MapperExtension
    {

        /// <summary>
        /// This method use to Map the Entity
        /// </summary>
        /// <typeparam name="TBase"></typeparam>
        /// <typeparam name="TRetun"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>

        public static TRetun ToMapp<TBase, TRetun>(this TBase value)
            where TBase : class
            where TRetun : class
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TBase, TRetun>();
            });

            var mapper = new Mapper(config);

            return mapper.Map<TRetun>(value);
        }

        /// <summary>
        /// This method use to Map the Entity
        /// </summary>
        /// <typeparam name="TBase"></typeparam>
        /// <typeparam name="TRetun"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>

        public static List<TRetun> ListToMapp<TBase, TRetun>(this List<TBase> value)
            where TBase : class
            where TRetun : class
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TBase, TRetun>();
            });

            var mapper = new Mapper(config);

            return mapper.Map<List<TRetun>>(value);
        }
    }
}

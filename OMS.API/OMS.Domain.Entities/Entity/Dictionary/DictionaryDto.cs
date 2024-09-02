﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Dictionary
{
    public class DictionaryDto
    {
        [Key]
        public int? DictionaryId { get; set; }
        public string? Key { get; set; }
        public string? Value { get; set; }
    }
}

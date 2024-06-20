﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.SupplierNotes
{
    public class BaseSupplierNotesDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? SupplierNoteId { get; set; }
        public string? Note { get; set; }
        public int? SupplierId { get; set; }
    }
}

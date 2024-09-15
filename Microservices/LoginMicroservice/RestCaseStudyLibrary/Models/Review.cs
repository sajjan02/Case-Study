﻿using System;
using System.Collections.Generic;

namespace RestCaseStudyLibrary.Models;

public partial class Review
{
    public int ReviewId { get; set; }

    public int? ProductId { get; set; }

    public int? UserId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public DateOnly? ReviewDate { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? User { get; set; }
}

<?php

/*
 * This file is part of the Base62 package
 *
 * Copyright (c) 2016-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/tuupola/base62
 *
 */

namespace Tuupola\Base62;

use Tuupola\Base62;

class GmpEncoder
{
    private $options = [
        "characters" => Base62::GMP,
    ];

    public function __construct($options = [])
    {
        $this->options = array_merge($this->options, (array) $options);
    }

    public function encode($data)
    {
        if (is_integer($data)) {
            $hex = dechex($data);
        } else {
            $hex = bin2hex($data);
        }
        $base62 = gmp_strval(gmp_init($hex, 16), 62);

        if (Base62::GMP === $this->options["characters"]) {
            return $base62;
        }
        return strtr($base62, Base62::GMP, $this->options["characters"]);
    }

    public function decode($data, $integer = false)
    {
        if (Base62::GMP !== $this->options["characters"]) {
            $data = strtr($data, $this->options["characters"], Base62::GMP);
        }

        $hex = gmp_strval(gmp_init($data, 62), 16);
        if (strlen($hex) % 2) {
            $hex = "0" . $hex;
        }

        /* Return as integer when requested. */
        if ($integer) {
            return hexdec($hex);
        }

        return hex2bin($hex);
    }
}
